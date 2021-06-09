import { Injectable } from '@angular/core';
import {LoginModel} from '../login/model/login-model';
import {HttpClient} from '@angular/common/http';
import {MasterUrl} from '../shared/master-url';
import {Observable} from 'rxjs';
import {LoginResponse} from '../login/model/login-response';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isLoggedIn: boolean;
  form: LoginModel;
  readonly APIURL = MasterUrl.baseUrl + 'users/'
  constructor(private http: HttpClient) { }

  login(form: LoginModel): Observable<LoginResponse>{

   return this.http.post<LoginResponse>(this.APIURL + 'authenticate', form);

  }
}
