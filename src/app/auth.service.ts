import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  registerUser(user:Object){
    return this._http.post<any>('/auth/register', user);
  };

  userLogin(user:Object){
    return this._http.post<any>('/auth/login', user);
  };

  // loggingout(){
  //   return this._http.post('/auth/logout');
  // }
}
