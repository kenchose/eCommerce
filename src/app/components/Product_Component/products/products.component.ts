import { Component, OnInit } from "@angular/core";
import { ProductService } from "./../../../product.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: object[];
  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._productService
      .allProducts()
      .subscribe(product => (this.products = product["products"]));
  }
}
