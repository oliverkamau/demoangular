import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../shared/token-storage.service';
import {SytemSetupService} from '../../services/sytem-setup.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ResponseData} from '../../../../shared/response-data';
import {SequencesModel} from '../../model/sequences-model';

@Component({
  selector: 'app-add-sequence',
  templateUrl: './add-sequence.component.html',
  styleUrls: ['./add-sequence.component.css']
})
export class AddSequenceComponent implements OnInit {

  item: ResponseData;

  constructor(public token: TokenStorageService ,
              public service: SytemSetupService,
              public dialogbox: MatDialogRef<AddSequenceComponent>) { }

  ngOnInit(): void {
  }

  saveSequences(value: SequencesModel): void{
    this.service.saveSequences(value, this.token.getToken()).subscribe(
      resp => {
        this.onClose();
        this.item = {
          code: '200',
          response: resp.response
        };
        this.service.filter(this.item);
      },
      error => {
        console.log(error.error.message);
        this.item = {
          code: '500',
          response: error.error.message
        };
        this.service.filter(this.item);
      }
    );
  }
  onClose(): void{
    this.dialogbox.close();
  }

  closeModal(): void{
    this.resetSequences();
    this.dialogbox.close();
  }

  resetSequences(): void{
    this.service.sequence = {
      seqCode: 0,
      seqName: '',
      seqValue: '',
      department: '',
    };
  }
}
