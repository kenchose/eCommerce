import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private _cartSource = new Subject<any>();
  currentCart = this._cartSource.asObservable();

  constructor(private _http: HttpClient) {}

  cartData(cart: any) {
    this._cartSource.next(cart);
  }

  getCart() {
    return this._http.get("/api/order/cart");
  }
}
