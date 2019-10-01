import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import {
  HttpHeaders,
  ɵangular_packages_common_http_http_a
} from "@angular/common/http";
import { UserService } from "./../../user.service";
import { userInfo } from "os";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
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

  login() {
    this._authService.userLogin(this.oldUser).subscribe(user => {
      if (user.message) {
        this.errors.length = 0;
        for (let key in user.message) {
          this.errors.push(user.message[key]);
          this.resetLogin();
          this._router.navigate(["/cartify"]);
        }
      } else {
        this._userService.userData((user = this.currUser = user));

        // store token
        const { token } = user;
        localStorage.setItem("token", token);
        this.redirectTo("cartify/home");
      }
    });
  }

  redirectTo(url) {
    this._router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this._router.navigate([url]));
  }

  selectAccount(id: number) {
    this._userService.userAccount(id).subscribe(user => {
      this.redirectTo("cartify/account/" + id);
    });
  }

  resetLogin() {
    this.oldUser = { email: "", password: "" };
  }
}
