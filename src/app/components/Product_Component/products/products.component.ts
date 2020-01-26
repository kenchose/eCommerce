import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProductService } from "./../../../product.service";
import { CartService } from "./../../../cart.service";
import { AuthService } from "./../../../auth.service";
import { UserService } from "./../../../user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  @Output() taskEmitter = new EventEmitter();

  cart: any;
  products: object[] = [];
  loggedUser: any;
  product: object;
  addProduct: any;
  cartItems: any;
  up: any;
  capp: any;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _userService: UserService,
    private _cartService: CartService,
    public _route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this._authService.loggedIn()) {
      this.getUserData();

      this.getCurrentCart();

      this._cartService.currentCart.subscribe(updatedCart => {
        // Shared cart data
        this.cart = updatedCart["cart"];
        this.cartItems = updatedCart["cartItems"];
        console.log("caritems", this.cartItems);
      });

      this._userService.currentUser.subscribe(user => {
        // Shared user data
        this.loggedUser = user;
      });
    }

    this._productService.allProducts().subscribe(product => {
      this.products = product["products"];
    });
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      this.currUserData(this.loggedUser);
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this._cartService.cartData(cartUpdate); //get cartdata to update totalQty
    });
  }

  currUserData(currentUser) {
    this._userService.userData(currentUser);
  }
}
