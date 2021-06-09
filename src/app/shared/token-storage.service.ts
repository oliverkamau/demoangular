import { Injectable } from '@angular/core';
const TOKEN_KEY= 'auth-token';
const USER_KEY= 'auth-user';
const CLIENT_KEY= 'client-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  }
  storeClientId(client: string): void{
    window.sessionStorage.removeItem(CLIENT_KEY);
    window.sessionStorage.setItem(CLIENT_KEY, client);
  }
  public getClientId(): string{
    return sessionStorage.getItem(CLIENT_KEY);
  }
  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any{
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
