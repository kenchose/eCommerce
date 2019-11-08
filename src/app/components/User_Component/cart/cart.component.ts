import { Component, OnInit } from "@angular/core";
import { OrderService } from "./../../../order.service";
import { CartService } from "./../../../cart.service";
import { NumberValueAccessor } from "@angular/forms";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cart: any;
  fullCart: any;
  tax: any;
  taxNum: number;
  taxString: string;
  totalSum: number;
  itemTotalPrice: any;
  currentCart: any;
  cartItems: any;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    //gets updated cart informartion
    this._cartService.getCart().subscribe(cartUpdate => {
      console.log("now the session is in the house");
      console.log("now sessio", cartUpdate);
      this.cartItems = cartUpdate["cart"];
      this.currentCart = cartUpdate["fullCart"];
      console.log("currentCart", this.currentCart);
      this.taxNum = this.currentCart.totalPrice * 0.0775;
      this.taxString = (this.currentCart.totalPrice * 0.0775).toFixed(2);
      this.totalSum = (this.taxNum + this.currentCart.totalPrice).toFixed(2);
      this._cartService.cartData(this.currentCart);
    });

    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cart = updatedCart;
      console.log("updated cart", this.cart);
    });
  }

  removeItem(productId) {
    this._orderService.removeFromCart(productId).subscribe(cart => {
      this._cartService.getCart().subscribe(cartUpdate => {
        this.cartItems = cartUpdate["cart"];
        this.currentCart = cartUpdate["fullCart"];
        this.taxNum = this.currentCart.totalPrice * 0.0775;
        this.taxString = (this.currentCart.totalPrice * 0.0775).toFixed(2);
        this.totalSum = (this.taxNum + this.currentCart.totalPrice).toFixed(2);
        this._cartService.cartData(this.currentCart);
      });
      this._cartService.cartData(this.cart);
    });
  }
}
