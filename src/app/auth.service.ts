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

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/cartify"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  // getUser() {
  //   return localStorage.getItem("user");
  // }
}
