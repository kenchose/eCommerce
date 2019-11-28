import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"]
})
export class NewProductComponent implements OnInit {
  // newProduct: object;
  // product: object;
  // error: [];
  constructor() {}

  ngOnInit() {
    // this.newProduct = {
    //   imagePath: "",
    //   name: "",
    //   price: "",
    //   description: "",
    //   category: ""
    // };
  }

  // createProduct(formData: NgForm) {
  //   console.log(this.newProduct);
  //   this._productService
  //     .createProduct(this.newProduct)
  //     .subscribe(newProduct => {
  //       // if (newProduct['messages']) {
  //       //   this.error.length = 0;
  //       //   for(let key of newProduct['messages']){
  //       //     key.push()
  //       //   }
  //       // }
  //       console.log("new user craeted", newProduct);
  //       this.product = newProduct["newProduct"];
  //     });
  // }
}
