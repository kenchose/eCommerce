import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MapsService {
  constructor(private _http: HttpClient) {}

  // locationMaps(){
  //   return this._http.get()
  // }
}
