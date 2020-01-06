import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { AuthService } from "../../../auth.service";
import { CartService } from "./../../../cart.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService as AuthSocialService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loggedUser: object = {};
  cart: any;
  id: string;
  cartItems: any;
  private user: SocialUser;
  private loggedIn: any;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _authSocial: AuthSocialService,
    public _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._authSocial.authState.subscribe(user => {
      console.log("new user", user);
      this.user = user;
      this.loggedIn = user != null;
    });

    // this._router.params.subscribe((params: Params) => {
    //   console.log("this is me");
    //   console.log("this is me", params);
    //   // this._userService.currUser(params["userId"]).subscribe(user => {
    //   //   this.user = user["user"];
    //   // });
    // });

    this.getUserData();
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
      console.log("loggedUser", this.loggedUser);
    });

    this._cartService.currentCart.subscribe(updatedCart => {
      //shared cartData
      this.cart = updatedCart;
    });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      this._userService.userData(this.loggedUser);
    });
  }

  signInWithGoogle() {
    this._authService.logoutUser();
    const googleUser = GoogleLoginProvider.PROVIDER_ID;
    this._authSocial.signIn(googleUser).then(userData => {
      console.log("right beoer we post", userData);
      this._authService.setToken(`Bearer ${userData.authToken}`);
      this._authService.setUser(userData["id"]);
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
      this.getCurrentCart();
      this._router.navigate(["cartify/home"]);
      document.getElementById("closeModal").click();
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this.cartItems = cartUpdate["cartItems"];
      this.cart = cartUpdate["cart"];
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }

  socialLogout(): void {
    this._authSocial.signOut();
    this._authService.logoutUser();
    this._router.navigate(["sign-in"]);
  }
}
