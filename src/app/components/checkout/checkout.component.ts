import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../user.service";
import { AuthService } from "./../../auth.service";
import { CartService } from "./../../cart.service";
import { OrderService } from "./../../order.service";
import { Router } from "@angular/router";
import { tokenGetter } from "src/app/app.module";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  cart: any;
  actualTax: number;
  cartItems: object;
  loggedUser: object;
  stripePubKey: string;
  stripeSecretKey: string;
  tax: any;
  totalSum: number;
  order: object;
  qty: number;
  purchaseSuccess: boolean;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _orderService: OrderService,
    private _router: Router
  ) {
    this._orderService.stripGetKeys().subscribe(key => {
      this.stripePubKey = key["stripePubKey"];
      this.stripeSecretKey = key["stripeSecretkey"];
    });
  }

  ngOnInit() {
    this.getUserData();
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });
    this.getCurrentCart();
    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cart = updatedCart["cart"];
      this.cartItems = updatedCart["cartItems"];
      this.actualTax = this.cart.totalPrice * 0.0775;
      this.tax = this.actualTax.toFixed(2);
      let tax = Number(this.tax);
      this.totalSum = (tax + this.cart.totalPrice).toFixed(2);
    });
    if (!this._cartService.currentCart) {
      this._router.navigate(["/cartify"]);
    }
    this.purchaseSuccess;
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      this._userService.userData(this.loggedUser);
    });
  }

  updateUserInfo() {
    this._userService.editUser(this.loggedUser).subscribe(user => {
      console.log("edituser", user);
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this._cartService.cartData(cartUpdate);
    });
  }

  pay(totalSum: number) {
    document.getElementById("close-btn").click();
    let cart = Object.values(this.cartItems);
    let order = [];
    for (let item of cart) {
      let id = item.item._id;
      let image = item.item.imagePath;
      let name = item.name;
      let qty = item.qty;
      let price = item.price;
      order.push({
        id: id,
        image: image,
        name: name,
        qty: qty,
        price: price
      });
    }
    let handler = StripeCheckout.configure({
      key: this.stripePubKey,
      locale: "auto",
      token: token => {
        const tokenInfo = {
          stripeToken: token.id,
          email: token["card"].name,
          totalPayment: totalSum,
          user: this.loggedUser,
          order: order
        };
        this._orderService.stripeCharge(tokenInfo).subscribe(result => {
          this.order = result["order"];
          console.log("this.order", typeof this.order);
          this.purchaseSuccess = true;
          this._router.navigate(["checkout/paymentsuccess"]);
        });
      }
    });

    handler.open({
      name: "Cartify",
      image: "./../../../assets/img/marketplace.png",
      currency: "usd",
      amount: totalSum * 100
    });
  }
}
