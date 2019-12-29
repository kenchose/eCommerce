import { Component, OnInit } from "@angular/core";
import { OrderService } from "./../../../order.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"]
})
export class OrderDetailsComponent implements OnInit {
  cart: any;
  order: any;
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._orderService.singleOrder(params["id"]).subscribe(order => {
        this.cart = order["items"];
        this.order = order["order"];
      });
    });
  }
}
