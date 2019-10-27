import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private _cartSource = new Subject<any>();
  currentCart = this._cartSource.asObservable();

  constructor() {}

  cartData(cart: any) {
    this._cartSource.next(cart);
  }
}
