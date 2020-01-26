import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { CartService } from "./../../cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  currUser: Object;
  newUser: Object;
  error: String[] = [];
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this.newUser = { first_name: "", last_name: "", email: "", password: "" };
  }

  ngOnInit() {}

  register() {
    this._authService.registerUser(this.newUser).subscribe(newUser => {
      this.emptyArray();
      if (newUser.errors) {
        this.error.push(newUser.errors);
        this.resetRegistration();
        this._router.navigate(["/registration"]);
      } else {
        const { token, user } = newUser;
        this._authService.setToken(token);
        this._authService.setUser(user["_id"]);
        this._authService.setTimeoutStorage();
        this.getCurrentCart();
        this._router.navigate(["/cartify/home"]);
      }
    });
  }

  resetRegistration() {
    this.newUser = { first_name: "", last_name: "", email: "", password: "" };
  }

  emptyArray() {
    this.error.length = 0;
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }
}
