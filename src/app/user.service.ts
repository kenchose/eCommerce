import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _userSource = new BehaviorSubject<object>(Object);
  currentUser = this._userSource.asObservable();

  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/api/user/";

  userData(user: any) {
    this._userSource.next(user);
  }

  currUser(id: string) {
    return this._http.get(this.serviceUrl + id);
  }

  deleteUser(user: Object) {
    return this._http.post(this.serviceUrl + "delete", user);
  }

  userAccount(id) {
    return this._http.get(this.serviceUrl + "account/" + id);
  }
}
