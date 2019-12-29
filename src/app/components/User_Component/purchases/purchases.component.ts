import { Component, OnInit } from "@angular/core";
import { OrderService } from "./../../../order.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.scss"]
})
export class PurchasesComponent implements OnInit {
  orders: any;
  constructor(
    private _orderService: OrderService,
    public _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._orderService.getOrders().subscribe(order => {
      this.orders = order["orders"];
    });
  }
}
