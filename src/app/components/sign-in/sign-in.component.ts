import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { UserService } from "./../../user.service";
import { CartService } from "./../../cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  oldUser: any;
  errors: String[] = [];
  currUser: any;
  loggedUser: any;
  sharedCart: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _cartService: CartService
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });

    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.sharedCart = updatedCart;
    });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.currUser = user;
      this._userService.userData(this.currUser);
    });
  }

  login() {
    this._authService.userLogin(this.oldUser).subscribe(userLogged => {
      if (userLogged.message) {
        this.emptyArray();
        for (let key in userLogged.message) {
          this.errors.push(userLogged.message[key]);
          this.resetLogin();
          this._router.navigate(["/sign-in"]);
        }
      } else {
        this._userService.userData(user => (this.currUser = user));

        // store token
        const { token, user } = userLogged;
        this._authService.setUser(user["_id"]);
        this._authService.setToken(token);
        this._authService.setTimeoutStorage();
        this.getCurrentCart();
        this.getUserData();
        this._router.navigate(["/cartify/home"]);
      }
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }

  emptyArray() {
    this.errors.length = 0;
  }

  resetLogin() {
    this.oldUser = { email: "", password: "" };
  }
}
