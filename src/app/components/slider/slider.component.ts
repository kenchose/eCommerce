import { Component, OnInit } from "@angular/core";
import { ProductService } from "./../../product.service";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  constructor(private _productService: ProductService) {}

  products: any;

  ngOnInit() {
    this._productService
      .allProducts()
      .subscribe(product => (this.products = product["products"]));
  }
}
