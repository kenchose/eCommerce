import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/api/product";

  allProducts() {
    return this._http.get(`${this.serviceUrl}/products`);
  }

  // createProduct(newProduct: object) {
  //   return this._http.post(`${this.serviceUrl}/create`, newProduct);
  // }

  oneCategory(category: string) {
    return this._http.get(`${this.serviceUrl}/category/${category}`);
  }

  oneProduct(productId: string) {
    return this._http.get(`${this.serviceUrl}/${productId}`);
  }

  choice() {
    return this._http.get(`${this.serviceUrl}`);
  }
}
