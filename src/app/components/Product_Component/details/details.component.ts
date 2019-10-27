import { Component, OnInit } from "@angular/core";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../../product.service";
import { OrderService } from "./../../../order.service";
import { CartService } from "./../../../cart.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  oneProduct: any;
  addProduct: any;
  productId: string;
  quantity: number = 1;
  cart: any;
  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {
    this.addProduct = { productId: "", quantity: "0" };
  }

  ngOnInit() {
    this._cartService.currentCart.subscribe(updatedCart => {
      this.cart = updatedCart;
    });
    this._route.params.subscribe((params: Params) => {
      this._productService.oneProduct(params["id"]).subscribe(product => {
        this.oneProduct = product["product"];
        this.oneProduct.productId = this.oneProduct._id;
      });
    });
  }

  addToOrder(productId: String, quantity: Number) {
    this._orderService.addToCart(productId, quantity).subscribe(fullCart => {
      this._cartService.cartData(fullCart);
    });
  }

  addCount() {
    this.quantity++;
  }
  minusCount() {
    this.quantity--;
    if (this.quantity == 0) {
      this.quantity = 1;
    }
  }
}
