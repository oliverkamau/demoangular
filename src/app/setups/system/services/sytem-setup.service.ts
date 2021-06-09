import { Injectable } from '@angular/core';
import {OrganizationModel} from '../model/organization-model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ResponseData} from '../../../shared/response-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MasterUrl} from '../../../shared/master-url';
import {DataTablesResponse} from '../../../shared/datatable_response';
import {ParametersModel} from '../model/parameters-model';
import {SequencesModel} from '../model/sequences-model';

@Injectable({
  providedIn: 'root'
})
export class SytemSetupService {

  readonly APIURL = MasterUrl.baseUrl + 'setups/system/';
  org: OrganizationModel;
  parameters: ParametersModel;
  sequence: SequencesModel;
  saved: boolean;
  private listeners = new Subject<any>();
  pUsed: boolean;
  // private apiData = new BehaviorSubject<any>(null);
  // public apiData$ = this.apiData.asObservable();

  constructor( private http: HttpClient) { }

  saveOrganisation(formData: FormData, token: string): Observable<ResponseData> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr)
    return this.http.post<ResponseData>(this.APIURL + 'createOrganisation' , formData , {headers});
  }

  checkOrganisation(token: string): Observable<OrganizationModel> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<OrganizationModel>(this.APIURL + 'getOrganization' , {headers});
  }

  deleteOrg(orgCode: number, token: string): Observable<ResponseData> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<ResponseData>(this.APIURL + 'deleteOrganization/' + orgCode , {headers});
  }

  getParameters(token: string): Observable<DataTablesResponse> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<DataTablesResponse>(this.APIURL + 'getParameters', {headers});
  }

  saveParameters(value: ParametersModel, token: string): Observable<ResponseData> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr)
    return this.http.post<ResponseData>(this.APIURL + 'createParameters' , value, {headers});
  }
  // setData(data){
  //   this.apiData.next(data);
  // }
  listen(): Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy: any): void{
    this.listeners.next(filterBy);
  }

  deleteParameter(paramCode: string, token: string): Observable<ResponseData> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<ResponseData>(this.APIURL + 'deleteParameter/' + paramCode , {headers});
  }

  getSequences(token: string): Observable<DataTablesResponse> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<DataTablesResponse>(this.APIURL + 'getSequences', {headers});
  }

  saveSequences(value: SequencesModel, token: string): Observable<ResponseData> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr)
    return this.http.post<ResponseData>(this.APIURL + 'createSequences' , value, {headers});
  }

  deleteSequence(seqCode: number, token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization' , tokenStr);
    return this.http.get<ResponseData>(this.APIURL + 'deleteSequence/' + seqCode , {headers});
  }
}
