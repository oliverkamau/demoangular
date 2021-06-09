import { Component, OnInit } from '@angular/core';
import {MainService} from '../service/main.service';
import {LoginModel} from './model/login-model';
import {TokenStorageService} from '../shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedInFailed = this.getTokenState();

  constructor(public service: MainService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.service.form = {
      password: '',
      username: ''
    };
  }

  logIn(form: LoginModel): void{

    this.service.login(form).subscribe(
      data => {
        console.log(data)
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.tokenStorageService.storeClientId(data.id);
        this.isLoggedInFailed = false;
        this.service.isLoggedIn = true;
      },
      error => {
        this.isLoggedInFailed = true;
        this.service.isLoggedIn = false;
      }
    );
  }

  private getTokenState(): boolean {
    const log = this.tokenStorageService.getToken();
    if(log === 'auth-token'){
      this.service.isLoggedIn = false;
    }
    else{
      this.service.isLoggedIn = false;
    }
    return this.service.isLoggedIn;
  }
}
