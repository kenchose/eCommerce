import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { AuthService } from "../../../auth.service";
import { CartService } from "./../../../cart.service";
// import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loggedUser: object = {};
  cart: any;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
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
}
