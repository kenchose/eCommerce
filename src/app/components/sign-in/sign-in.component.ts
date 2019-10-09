import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { UserService } from "./../../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  oldUser: any;
  errors: String[] = [];
  currUser: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.oldUser = { email: "", password: "" };
  }

  ngOnInit() {}

  login() {
    this._authService.userLogin(this.oldUser).subscribe(userLogged => {
      if (userLogged.message) {
        this.emptyArray();
        for (let key in userLogged.message) {
          this.errors.push(userLogged.message[key]);
          this.resetLogin();
          this._router.navigate(["/sign-in"]);
        }
      } else {
        // this._userService.userData((user = this.currUser = user));

        // store token
        const { token, user } = userLogged;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user["_id"]);
        this._router.navigate(["/cartify/home"]);
        this.redirectTo("cartify/home");
      }
    });
  }

  redirectTo(url) {
    this._router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this._router.navigate([url]));
  }

  emptyArray() {
    this.errors.length = 0;
  }

  resetLogin() {
    this.oldUser = { email: "", password: "" };
  }
}
