import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProductService } from "./../../../product.service";
import { CartService } from "./../../../cart.service";
import { AuthService } from "./../../../auth.service";
import { UserService } from "./../../../user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  @Output() taskEmitter = new EventEmitter();

  cart: any;
  products: object[] = [];
  newProduct: any;
  order: object[] = [];
  itemCount: number = 0;
  newNumber: any;
  currUser: any;
  userData: any;
  loggedUser: any;
  product: object;
  addProduct: any;
  currentCart: any;
  cartItems: any;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _userService: UserService,
    private _cartService: CartService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.newProduct = {
      imagePath: "",
      name: "",
      price: "",
      description: "",
      category: ""
    };
    this.addProduct = { quantity: "0" };
  }

  ngOnInit() {
    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cart = updatedCart;
      console.log("updated cart", this.cart);
    });

    this.getCurrentCart();

    this.getUserData();

    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });

    this._productService
      .allProducts()
      .subscribe(product => (this.products = product["products"]));
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.loggedUser = user["user"];
      // this._userService.userData(this.loggedUser); //original
      this.currUserData(this.loggedUser);
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      console.log("cart sessio", cartUpdate);
      this.cartItems = cartUpdate["cart"];
      this.currentCart = cartUpdate["fullCart"];
      this._cartService.cartData(this.currentCart); //get cartdata to update totalQty
    });
  }

  currUserData(currentUser) {
    this._userService.userData(currentUser);
  }

  createProduct() {
    this._productService.createProduct(this.newProduct).subscribe(newUser => {
      console.log("new user craeted", newUser);
    });
  }
}
