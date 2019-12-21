import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
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
  cart: object;
  cartItems: object;
  fullCart: boolean = false;

  constructor(
    private _orderService: OrderService,
    private _cartService: CartService,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    //this._route.parent.params.subscribe(params = console.log(`This parant params ${params})) NOTE THE .PARENT
    this._route.params.subscribe((params: Params) => {
      this._productService.oneProduct(params["id"]).subscribe(product => {
        this.oneProduct = product["product"];
      });

      this._cartService.currentCart.subscribe(updatedCart => {
        //shared data
        this.cartItems = updatedCart["cartItems"];
        this.cart = updatedCart["cart"];
      });
    });

    this.getCurrentCart();
  }

  addToOrder(productId: string) {
    this._orderService.addToCart(productId).subscribe(items => {
      this.fullCart = true;
      this.cart = items["cart"];
      this.cartItems = items["cartItems"];
      this.getCurrentCart();
    });
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(cartUpdate => {
      this.cartItems = cartUpdate["cartItems"];
      this.cart = cartUpdate["cart"];
      this._cartService.cartData(cartUpdate); //get cartdata to update
    });
  }
}
