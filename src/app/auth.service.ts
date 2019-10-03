import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  registerUser(user: Object) {
    return this._http.post<any>("/auth/register", user);
  }

  userLogin(user: Object) {
    return this._http.post<any>("/auth/login", user);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this._router.navigate(["/cartify/logoff"]);
  }

  getToken() {
    // let token = localStorage.getItem("token");
    // if (token) {
    //   let userPayload = atob(token.split(".")[1]);
    //   return JSON.parse(userPayload);
    // } else {
    //   return null;
    // }
    return localStorage.getItem("token");
  }

  getUser() {
    return localStorage.getItem("userId");
    //   if(currentUser){
    //     this.loggedIn.next()
    //   }
    //   return localStorage.getItem("user");
  }
}
