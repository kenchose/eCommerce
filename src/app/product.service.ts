import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/api/product";

  allProducts() {
    return this._http.get(this.serviceUrl + "/products");
  }

  createProduct(newUser: object) {
    return this._http.post(this.serviceUrl + "/create", newUser);
  }

  oneProduct(productId) {
    return this._http.get(this.serviceUrl + productId);
  }
}
