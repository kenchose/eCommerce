import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { AuthService } from "../../../auth.service";
import { CartService } from "./../../../cart.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
// import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  id: any;
  currUser: any;
  loggedUser: any;
  cart: any;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUserData();
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });

    // this._cartService.currentCart.subscribe(updatedCart => {
    //   //shared cartData
    //   this.cart = updatedCart;
    //   console.log("cart", this.cart);
    //   // this._cartService.cartData(updatedCart);
    // });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      console.log("logged in user", this.loggedUser);
      this._userService.userData(this.loggedUser);
    });
  }
}
