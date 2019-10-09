import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import {
  HttpHeaders,
  ɵangular_packages_common_http_http_a
} from "@angular/common/http";
import { UserService } from "./../../user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @ViewChild("formData", { static: false })
  formData: NgForm;

  oldUser: any;
  currUser: any;
  errors: String[] = [];

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {}

  login(myData: NgForm) {
    this._authService.userLogin(this.oldUser).subscribe(userLogged => {
      if (userLogged.message) {
        this.errors.length = 0;
        for (let key in userLogged.message) {
          this.errors.push(userLogged.message[key]);
          this._router.navigate(["/cartify"]);
        }
      } else {
        // this._userService.userData((user = this.currUser = user));
        // store token
        const { token, user } = userLogged;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user["_id"]);
        document.getElementById("closeModal").click();
        myData.resetForm();
        this._router.navigate(["cartify/home"]);
      }
    });
  }

  resetLogin() {
    this.oldUser = { email: "", password: "" };
  }
}
