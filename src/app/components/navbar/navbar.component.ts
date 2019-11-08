import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { CartService } from "./../../cart.service";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
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
  loggedUser: any;
  cart: any;
  currentCart: any;
  cartItems: any;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _cartService: CartService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
      console.log("loggedUser", this.loggedUser);
    });

    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data //this is a keeper!!!! cart totalQty updates using this method
      console.log("updatedCarttttt", updatedCart);
      this.cart = updatedCart;
      console.log("cart navbar component", this.cart);
    });

    if (this._authService.getUser()) {
      this.getCurrentCart(); //updated totalQty count withou having to add to cart to see change
    }
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
        const { token, user, cart } = userLogged;
        console.log("full cart", cart);
        this._authService.setToken(token);
        this._authService.setUser(user["_id"]);
        this.getCurrentCart();
        document.getElementById("closeModal").click();
        myData.resetForm();
        this._router.navigate(["cartify/home"]);
      }
    });
  }

  currCart() {
    this._cartService.getCart().subscribe(currCart => {
      console.log("current cart nav", currCart);
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      console.log("session cart", cartUpdate);
      this.cartItems = cartUpdate["cart"];
      this.currentCart = cartUpdate["fullCart"];
      this._cartService.cartData(this.currentCart); //get cartdata to update totalQty
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
}
