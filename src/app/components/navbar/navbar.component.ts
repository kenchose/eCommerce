import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { HttpService } from "./../../http.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  oldUser: any;
  user: any;
  currUser: any;
  errors: String[] = [];

  constructor(
    private _authService: AuthService,
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {
    // this._httpService.currentUser
    // .subscribe(user => this.currUser = user['user']); //share data through service
  }

  login() {
    this._authService.userLogin(this.oldUser).subscribe(user => {
      const { token } = user;
      this.currUser = user["user"];
      // this._httpService.userData(user = this.user = user['user']);
      this.emptyArray();
      if (user.message) {
        for (let key in user.message) {
          this.errors.push(user.message[key]);
          this.resetLogin();
          this._router.navigate(["/user/home"]);
        }
      } else {
        // store token
        localStorage.setItem("token", token); //might not need if using verify method
        this._router.navigate(["/user/home"]);
        // this._router.navigate(['/user/home', this.currUser['_id']]);
      }
    });
  }

  emptyArray() {
    this.errors.length = 0;
  }

  resetLogin() {
    this.oldUser = { email: "", password: "" };
  }
}
