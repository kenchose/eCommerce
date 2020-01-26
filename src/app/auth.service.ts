import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

  private serviceUrl = "http://localhost:8000/auth";

  registerUser(user: Object) {
    return this._http.post<any>(`${this.serviceUrl}/register`, user);
  }

  userLogin(user: Object) {
    return this._http.post<any>(`${this.serviceUrl}/login`, user);
  }
  redirect() {
    return this._http.get(`${this.serviceUrl}/google/redirect`);
  }
  googleLogin(user) {
    console.log("got to server", user);
    return this._http.post(`${this.serviceUrl}/google`, user);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  setUser(userId: string) {
    localStorage.setItem("userId", userId);
  }

  setTimeoutStorage() {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this._router.navigate(["/cartify"]);
    }, 180 * 60 * 1000); //180 mins
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
