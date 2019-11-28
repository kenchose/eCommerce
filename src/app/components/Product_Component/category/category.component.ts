import { Component, OnInit } from "@angular/core";
import { ProductService } from "./../../../product.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  products: object;
  category: object;
  categoryProduct: string;
  constructor(
    private _productService: ProductService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      const captialize = cat => {
        return cat.charAt(0).toUpperCase() + cat.slice(1);
      };
      this.categoryProduct = captialize(params["category"]);
      this.category = params["category"];
      this._productService
        .oneCategory(params["category"])
        .subscribe(product => {
          this.products = product["products"];
          console.log(this.products);
        });
    });
  }
}
