import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { CartService } from "./../../cart.service";
import { Router, NavigationEnd } from "@angular/router";
import { UserService } from "./../../user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @ViewChild("formData", { static: false })
  formData: NgForm;
  oldUser: any;
  currentUser: any;
  errors: String[] = [];
  loggedUser: object;
  cart: any;
  cartItems: any;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    if (this._authService.loggedIn()) {
      //added for errors; no more 401
      this.getUserData();
      this.getCurrentCart();
    }
    this._userService.currentUser.subscribe(user => {
      //shared user data
      this.loggedUser = user;
      console.log("this new loggeduser", this.loggedUser);
    });
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
        this.getUserData();
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
      this.currentUser = user;
      this._userService.userData(this.currentUser);
    });
  }

  googleLogin() {
    this._authService.google().subscribe(user => console.log(user));
  }

  // userAccount(userId) {
  //   this._userService.userAccount(userId).subscribe(user => {
  //     console.log(user);
  //   });
  // }
}
