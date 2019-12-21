import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "./../../../cart.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-success-purchase",
  templateUrl: "./success-purchase.component.html",
  styleUrls: ["./success-purchase.component.scss"]
})
export class SuccessPurchaseComponent implements OnInit {
  @Input("orderData") order: object;
  @Input() totalPayment: string;
  @Input() cartItems: object;
  @Input() salesTax: string;
  tax: string;
  totalSum: any;
  subTotal: any;
  cart: any;
  constructor(
    private _cartService: CartService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentCart();
    this.cart = this.cartItems;
    this.tax = Number(this.salesTax).toFixed(2);
    this.subTotal = this.order["totalPrice"];
    this.totalSum = this.totalPayment;
  }

  getCurrentCart() {
    this._cartService.getCart().subscribe(updateCart => {
      this._cartService.cartData(updateCart);
    });
  }
}
