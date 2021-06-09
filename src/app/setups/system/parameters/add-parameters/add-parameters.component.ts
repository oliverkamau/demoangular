import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../shared/token-storage.service';
import {SytemSetupService} from '../../services/sytem-setup.service';
import {ParametersModel} from '../../model/parameters-model';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {MatDialogRef} from '@angular/material/dialog';
import {ResponseData} from '../../../../shared/response-data';

@Component({
  selector: 'app-add-parameters',
  templateUrl: './add-parameters.component.html',
  styleUrls: ['./add-parameters.component.css']
})
export class AddParametersComponent implements OnInit {
  item: ResponseData;
  constructor(public token: TokenStorageService ,
              public service: SytemSetupService,
              public dialogbox: MatDialogRef<AddParametersComponent>) { }

  ngOnInit(): void {
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

  saveParameters(value: ParametersModel): void{
    console.log(value);
    this.service.saveParameters(value, this.token.getToken()).subscribe(
      resp => {
        this.onClose();
        this.item = {
          code: '200',
          response: resp.response
        };
        this.service.filter(this.item);
        console.log(resp);

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
    this.resetParams();
    this.dialogbox.close();
  }
}
