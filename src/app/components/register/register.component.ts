import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";
import { HttpService } from "./../../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  currUser: Object;
  newUser: Object;
  errors: String[] = [];

  constructor(
    private _authService: AuthService,
    private _httpService: HttpService,
    private _router: Router
  ) {
    this.newUser = { first_name: "", last_name: "", email: "", password: "" };
  }

  ngOnInit() {}

  register() {
    this._authService.registerUser(this.newUser).subscribe(user => {
      this.emptyArray();
      if (user.errors) {
        for (let key in user.errors) {
          this.errors.push(user.errors[key]);
          this.resetRegistration();
          this._router.navigate(["/registration"]);
        }
      } else {
        this._httpService.userData((user = this.currUser = user)); //share data through service

        const { token } = user;
        //store token in localStorage
        this._authService.setToken(user["token"]);
        this._router.navigate(["/cartify/home"]);
      }
    });
  }

  resetRegistration() {
    this.newUser = { email: "", password: "" };
  }

  emptyArray() {
    this.errors.length = 0;
  }
}
