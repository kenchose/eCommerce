import { Component, OnInit } from "@angular/core";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../../product.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._productService
        .oneProduct(params["id"])
        .subscribe(product => console.log("one product", product));
    });
  }
}
