import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TokenStorageService} from '../../../shared/token-storage.service';
import {SytemSetupService} from '../services/sytem-setup.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {AddParametersComponent} from '../parameters/add-parameters/add-parameters.component';
import {AddSequenceComponent} from './add-sequence/add-sequence.component';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.css']
})
export class SequencesComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['seqCode', 'seqName', 'seqValue', 'department', 'options']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  noRecord = false;
  data: string;
  constructor(public token: TokenStorageService, public service: SytemSetupService , public dialog: MatDialog) {
    service.listen().subscribe(data => {

      if(data.code === '200'){
        Swal.fire(
          'Success',
          data.response,
          'success'
        );
        this.getSequences();
      }
      else {
        Swal.fire(
          'Error',
          data.response,
          'error');
      }
    });
  }

  ngOnInit(): void {
    this.resetSequences();
    this.getSequences();
  }

  createSequence(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddSequenceComponent, dialogConfig);
  }

  onSearchClear(): void{
    this.searchKey = '';
    this.applyFilter();
    this.getSequences();
  }
  applyFilter(): void{
    this.listData.filter = this.searchKey.trim().toLowerCase();
    if (this.listData.filteredData.length === 0){
      this.noRecord = true;
    }
    else{
      this.noRecord = false;
    }
  }

  private getSequences(): void{
    this.service.getSequences(this.token.getToken()).subscribe(resp => {
      this.listData = new MatTableDataSource(resp.data);
      this.listData.sort = this.sort;
      this.listData.paginator =  this.paginator;
    });
  }
  resetSequences(): void{
    this.service.sequence = {
      seqCode: 0,
      seqName: '',
      seqValue: '',
      department: '',
    };
  }

  onEdit(row: any): void{
    this.service.sequence.seqCode = row.seqCode;
    this.service.sequence.seqName = row.seqName;
    this.service.sequence.seqValue = row.seqValue;
    this.service.sequence.department = row.department;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddSequenceComponent, dialogConfig);
  }

  onDelete(row: any): void{
    Swal.fire({
      title: 'Are you sure want to delete this sequence ?',
      text: ' This action will be irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {

        this.service.deleteSequence(row.seqCode, this.token.getToken()).subscribe(
          resp => {

            Swal.fire(
              'Deleted!',
              resp.response,
              'success'
            );
            this.getSequences();
          },
          error => {

            Swal.fire(
              'Error',
              error.error.message,
              'error'
            );

          }
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
}
