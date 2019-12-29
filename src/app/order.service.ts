import { Injectable, ɵCodegenComponentFactoryResolver } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private _http: HttpClient) {}

  private serviceUrl = "http://localhost:8000/api/order";

  addToCart(productId: string) {
    return this._http.get(`${this.serviceUrl}/add-to-cart/${productId}`);
  }

  removeFromCart(productId: string) {
    return this._http.get(`${this.serviceUrl}/remove-from-cart/${productId}`);
  }

  getOrders() {
    return this._http.get(`${this.serviceUrl}/purchaseHistory`);
  }

  singleOrder(orderId: Params) {
    return this._http.get(`${this.serviceUrl}/${orderId}`);
  }

  currentCart() {
    return this._http.get(`${this.serviceUrl}/cart`);
  }

  stripeCharge(tokenInfo) {
    return this._http.post(`${this.serviceUrl}/charge`, tokenInfo);
  }

  stripGetKeys() {
    return this._http.get(`${this.serviceUrl}/checkout`);
  }
}
