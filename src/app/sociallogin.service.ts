import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SocialloginService {
  url;
  constructor(private _http: HttpClient) {}

  Savesresponse(response) {
    this.url = "http://localhost:8000/auth/socialLogin";
    return this._http.post(this.url, response);
  }
}
