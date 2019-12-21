import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../order.service";
import { CartService } from "../../cart.service";
import { UserService } from "./../../user.service";
import { AuthService } from "./../../auth.service";
import { NumberValueAccessor } from "@angular/forms";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  loggedUser: any;
  cart: any;
  tax: any;
  qty: number;
  actualTax: number;
  totalSum: number;
  cartItems: any;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserData();
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });
    this.getCurrentCart();
    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cartItems = updatedCart["cartItems"];
      this.cart = updatedCart["cart"];
      this.actualTax = this.cart.totalPrice * 0.0775;
      this.tax = this.actualTax.toFixed(2);
      let tax = Number(this.tax);
      this.totalSum = (tax + this.cart.totalPrice).toFixed(2);
    });
  }

  removeItem(productId) {
    this._orderService.removeFromCart(productId).subscribe(cart => {
      this._cartService.getCart().subscribe(cartUpdate => {
        this._cartService.cartData(cartUpdate);
      });
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      this._userService.userData(this.loggedUser);
    });
  }
}
