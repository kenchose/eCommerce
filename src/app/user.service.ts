import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _userSource = new Subject<any>();
  currentUser = this._userSource.asObservable();

  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/api/user";

  userData(user: any) {
    this._userSource.next(user);
  }

  currUser(id: string) {
    return this._http.get(`${this.serviceUrl}/${id}`);
  }

  editUser(newUserData: any) {
    return this._http.put(
      `${this.serviceUrl}/edit/${newUserData._id}`,
      newUserData
    );
  }

  deleteUser(user: Object) {
    return this._http.post(`${this.serviceUrl}/delete`, user);
  }
}
