import { Component, OnInit } from "@angular/core";
import { ProductService } from "./../../../product.service";

@Component({
  selector: "app-employee-choice",
  templateUrl: "./employee-choice.component.html",
  styleUrls: ["./employee-choice.component.scss"]
})
export class EmployeeChoiceComponent implements OnInit {
  products: object[] = [];
  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.choice().subscribe(product => {
      this.products = product["products"];
      console.log("products", this.products);
    });
  }
}
