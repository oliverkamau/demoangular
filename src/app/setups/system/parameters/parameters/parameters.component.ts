import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TokenStorageService} from '../../../../shared/token-storage.service';
import {SytemSetupService} from '../../services/sytem-setup.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddParametersComponent} from '../add-parameters/add-parameters.component';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['paramName', 'paramValue', 'paramDesc', 'paramType', 'paramUsed', 'options']
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
       this.getParameters();
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
    this.resetParams();
    this.getParameters();
  }

  onSearchClear(): void{
    this.searchKey = '';
    this.applyFilter();
    this.getParameters();
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

  onEdit(row: any): void{
    this.service.parameters.paramCode = row.paramCode;
    this.service.parameters.paramType = row.paramType;
    this.service.parameters.paramName = row.paramName;
    this.service.parameters.paramValue = row.paramValue;
    this.service.parameters.paramDesc = row.paramDesc;
    if(row.paramUsed === 'Yes'){
      this.service.parameters.paramUsed = true;
      this.service.pUsed = true;
    }
    else{
      this.service.parameters.paramUsed = false;
      this.service.pUsed = false;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddParametersComponent, dialogConfig);
  }

  onDelete(row: any): void{
      Swal.fire({
        title: 'Are you sure want to delete this parameter ?',
        text: ' This action will be irreversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {

          this.service.deleteParameter(row.paramCode, this.token.getToken()).subscribe(
            resp => {

              Swal.fire(
                'Deleted!',
                resp.response,
                'success'
              );
              this.getParameters();
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
  createParameter(): void{
    this.resetParams();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddParametersComponent, dialogConfig);
  }
  getParameters(): void{
      this.service.getParameters(this.token.getToken()).subscribe(resp => {
      this.listData = new MatTableDataSource(resp.data);
      this.listData.sort = this.sort;
      this.listData.paginator =  this.paginator;
    });
  }
  resetParams(): void{
    this.service.parameters = {
      paramCode: 0,
      paramName: '',
      paramDesc: '',
      paramValue: '',
      paramUsed: false,
      paramType: ''
    };
  }
}
