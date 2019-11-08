import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, ReplaySubject, Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private _cartSource = new Subject<any>();
  // private _cartSource = new ReplaySubject<any>(1);
  // private _cartSource = new BehaviorSubject<any>(1);
  currentCart = this._cartSource.asObservable();

  constructor(private _http: HttpClient) {}

  cartData(cart: any) {
    this._cartSource.next(cart);
  }

  getCart() {
    return this._http.get("/api/order/cart");
  }
}
