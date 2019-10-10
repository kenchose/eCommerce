import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  private serviceUrl = "http://localhost:8000/auth/";

  registerUser(user: Object) {
    return this._http.post<any>(this.serviceUrl + "register", user);
  }

  userLogin(user: Object) {
    return this._http.post<any>(this.serviceUrl + "login", user);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this._router.navigate(["/cartify/logoff"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser() {
    return localStorage.getItem("userId");
  }
}
