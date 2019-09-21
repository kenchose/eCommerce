import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _userSource = new BehaviorSubject<object>(Object)
  currentUser = this._userSource.asObservable()

  constructor(
    private _http:HttpClient,
    ) { }

  userData(user:any){
    this._userSource.next(user)
  }

  currUser(id:Number){
    return this._http.get('/user/home/'+id);
  }

  deleteUser(user:Object){
    return this._http.post('/delete', user);
  }
}
