import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/product";

  allProducts() {
    return this._http.get(this.serviceUrl + "/products");
  }
}
