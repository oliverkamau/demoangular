import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainService} from '../../../service/main.service';
import {SytemSetupService} from '../services/sytem-setup.service';
import {OrganizationModel} from '../model/organization-model';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {TokenStorageService} from '../../../shared/token-storage.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  filePath: string;
  fromDb = false;
  image = 'School Logo';
  sore = 'Save';
  file: File;
  // @ViewChild('username',  {static: false}) username: ElementRef;
  @ViewChild('logo', {static: false}) input: ElementRef;
  byteString: any;

 constructor(public mainService: MainService, public service: SytemSetupService, public token: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  this.resetOrganization();
  this.checkOrganisation();
  }

  imagePreview(e): void {
        const file = (e.target as HTMLInputElement).files[0];
        this.file = (e.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.filePath = reader.result as string;
        }
        reader.readAsDataURL(file);
    }
  resetOrganization(): void {
    this.service.org = {
      orgCode: 0,
      name: '',
      description: '',
      address: '',
      box: '',
      telNo: '',
      cellNo: '',
      email: '',
      website: '',
      motto: '',
      vision: '',
      mission: '',
      status: '',
      encoded: ''
    };
  }

  saveOrganisation(value: OrganizationModel): void{
    // console.log(value);
    if(this.sore === 'Save') {
      const formData = new FormData();
      if (this.file !== undefined) {
        formData.append('logo', this.file);

      }
      formData.append('orgCode' , value.orgCode.toString())
      formData.append('name', value.name);
      formData.append('description', value.description);
      formData.append('address', value.address);
      formData.append('box', value.box);
      formData.append('telNo', value.telNo);
      formData.append('cellNo', value.cellNo);
      formData.append('email', value.email);
      formData.append('website', value.website);
      formData.append('motto', value.motto);
      formData.append('mission', value.mission);
      formData.append('vision', value.vision);

      this.service.saveOrganisation(formData, this.token.getToken()).subscribe(
        resp => {

          Swal.fire(
            'Success',
            resp.response,
            'success'
          );
          this.checkOrganisation();
        },

        error => {
          Swal.fire(
            'Error',
            error.error.message,
            'error');

        }
      );
    }
    else{
      this.sore = 'Save';
    }
  }

  checkOrganisation(): void {
    this.service.checkOrganisation(this.token.getToken()).subscribe(
      resp => {
        if (resp.status === 'data'){
          this.byteString = 'data:image/png;base64,' + resp.encoded;

          // this.fromDb = true;
          this.service.org.orgCode = resp.orgCode;
          this.service.org.name = resp.name;
          this.service.org.description = resp.description;
          this.service.org.address = resp.address;
          this.service.org.box = resp.box;
          this.service.org.cellNo = resp.cellNo;
          this.service.org.telNo = resp.telNo;
          this.service.org.email = resp.email;
          this.service.org.website = resp.website;
          this.service.org.motto = resp.motto;
          this.service.org.mission = resp.mission;
          this.service.org.vision = resp.vision;
          this.sore = 'Edit';
        }
        else if(resp.status === 'empty'){

          this.sore = 'Save';

          // this.fromDb = false;
          this.resetOrganization();

        }
      }
    );
  }
  transform(e: any): void{
     this.byteString = this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }

  deleteOranisation(): void {


    if (this.service.org.orgCode !== 0) {

      Swal.fire({
        title: 'Are you sure want to delete ' + this.service.org.name + '?',
        text: ' This action will be irreversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {

          this.service.deleteOrg(this.service.org.orgCode, this.token.getToken()).subscribe(
            resp => {

              Swal.fire(
                'Deleted!',
                resp.response,
                'success'
              );
              this.resetOrganization();
              this.byteString = '';
              this.filePath = '' ;
              this.checkOrganisation();
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
}
