import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { CartService } from "./../../cart.service";
import { Router } from "@angular/router";
import { UserService } from "./../../user.service";
import { AuthService as AuthSocialService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  // @ViewChild("formData", { static: false })
  formData: NgForm;
  oldUser: any;
  currentUser: any;
  errors: String[] = [];
  loggedUser: object;
  cart: any;
  cartItems: any;
  loginMethod: any;
  facebookUser: object;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    public _authService: AuthService,
    private _userService: UserService,
    private _cartService: CartService,
    private _authSocial: AuthSocialService,
    private _router: Router
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    this._authSocial.authState.subscribe(user => {
      console.log("new user", user);
      this.user = user;
      this.loggedIn = user != null;
    });

    if (this._authService.loggedIn() && this.loginMethod === "local") {
      // only works for local login !== GOOGLE
      // added for errors; no more 401
      this.getUserData();
      this.getCurrentCart();
    }
    if (this.loginMethod === "local") {
      this._userService.currentUser.subscribe(user => {
        //shared user data
        this.loggedUser = user;
        console.log("this new loggeduser", this.loggedUser);
      });
    }
    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cartItems = updatedCart["cartItems"];
      this.cart = updatedCart["cart"];
    });
  }

  login(myData: NgForm) {
    this._authService.userLogin(this.oldUser).subscribe(userLogged => {
      if (userLogged.message) {
        this.errors.length = 0;
        for (let key in userLogged.message) {
          this.errors.push(userLogged.message[key]);
          myData.resetForm();
          this._router.navigate(["/cartify"]);
        }
      } else {
        // store token and userID in localStorage
        const { token, user } = userLogged;
        this._authService.setToken(token);
        this._authService.setUser(user["_id"]);
        this._authService.setTimeoutStorage();
        this.loginMethod = user.method;
        this.getCurrentCart();
        document.getElementById("closeModal").click();
        myData.resetForm();
        this._router.navigate(["cartify/home"]);
      }
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this.cartItems = cartUpdate["cartItems"];
      this.cart = cartUpdate["cart"];
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.currentUser = user["user"];
      this._userService.userData(this.currentUser);
    });
  }

  socialLogout(): void {
    //only capabable using login with angularx-social-login
    this._authSocial.signOut();
    this._authService.logoutUser();
    this._router.navigate(["cartify"]);
  }

  signInWithGoogle() {
    const googleUser = GoogleLoginProvider.PROVIDER_ID;
    this._authSocial.signIn(googleUser).then(userData => {
      console.log("right beoer we post", userData);
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
