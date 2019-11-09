import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../../product.service";
import { UserService } from "./../../../user.service";
import { OrderService } from "./../../../order.service";
import { CartService } from "./../../../cart.service";
import { AuthService } from "./../../../auth.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  oneProduct: any;
  productId: string;
  qty: number = 1;
  cart: any;
  count: any;
  currentCart: any;
  loggedUser: any;
  currentUser: any;

  constructor(
    private _orderService: OrderService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this.getUserData();
    this._userService.currentUser.subscribe(user => {
      this.loggedUser = user;
      console.log("loggedUser", this.loggedUser);
    });

    this._cartService.currentCart.subscribe(updatedCart => {
      //shared data
      this.cart = updatedCart;
    });

    this._route.params.subscribe((params: Params) => {
      this._productService.oneProduct(params["id"]).subscribe(product => {
        this.oneProduct = product["product"];
        this.oneProduct.productId = this.oneProduct._id;
      });
    });
  }

  addToOrder(productId: string, qty: number) {
    this._orderService.addToCart(productId, qty).subscribe(fullCart => {
      console.log("added product", fullCart);
      this.currentCart = fullCart["cart"];
      this.getCurrentCart(this.currentCart);
    });
  }

  getCurrentCart(newCartData) {
    this._cartService.cartData(newCartData);
  }

  addCount() {
    this.qty++;
  }
  minusCount() {
    this.qty--;
    if (this.qty == 0) {
      this.qty = 1;
    }
  }

  getUserData() {
    const id = this._authService.getUser();
    this._userService.currUser(id).subscribe(user => {
      this.currentUser = user;
      this._userService.userData(this.currentUser);
    });
  }
}
