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
  newProduct: any;
  p: number = 1;
  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.newProduct = {
      imagePath: "",
      name: "",
      price: "",
      description: "",
      category: ""
    };
  }

  ngOnInit() {
    this._productService.allProducts().subscribe(product => {
      console.log("products", product);
      this.products = product["products"];
    });
  }

  createProduct() {
    this._productService.createProduct(this.newProduct).subscribe(newUser => {
      console.log("new user craeted", newUser);
    });
  }

  addToCart() {}
}
