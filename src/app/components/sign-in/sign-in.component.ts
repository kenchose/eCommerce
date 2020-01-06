import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { UserService } from "./../../user.service";
import { CartService } from "./../../cart.service";
import { Router } from "@angular/router";
import { AuthService as AuthSocialService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  oldUser: any;
  errors: String[] = [];
  currUser: object;
  loggedUser: any;
  sharedCart: any;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _cartService: CartService,
    private _authSocial: AuthSocialService
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    this._authSocial.authState.subscribe(user => {
      console.log("new user", user);
      this.user = user;
      this.loggedIn = user != null;
    });

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

        // store token and userID in localStorage
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

  signInWithGoogle() {
    const googleUser = GoogleLoginProvider.PROVIDER_ID;
    this._authSocial.signIn(googleUser).then(userData => {
      this._authService.setToken(`Bearer ${userData.authToken}`);
      this._authService.setUser(userData["id"]);
      this._authService.setTimeoutStorage();
      this.getCurrentCart();
      this._router.navigate(["cartify/home"]);
      document.getElementById("closeModal").click();
    });
  }

  signInWithFB() {
    const facebookUser = FacebookLoginProvider.PROVIDER_ID;
    this._authSocial.signIn(facebookUser).then(userData => {
      this._authService.setToken(`Bearer ${userData.authToken}`);
      this._authService.setUser(userData.facebook["id"]);
      this._authService.setTimeoutStorage();
      this.getCurrentCart();
      this._router.navigate(["cartify/home"]);
      document.getElementById("closeModal").click();
    });
  }
}
