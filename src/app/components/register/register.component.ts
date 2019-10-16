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
    this._authService.registerUser(this.newUser).subscribe(newUser => {
      this.emptyArray();
      if (newUser.errors) {
        for (let key in newUser.errors) {
          this.errors.push(newUser.errors[key]);
          this.resetRegistration();
          this._router.navigate(["/registration"]);
        }
      } else {
        const { token, user } = newUser;
        //store token and userID in localStorage
        this._authService.setToken(token);
        this._authService.setUser(user["_id"]);
        this._router.navigate(["/cartify/home"]);
      }
    });
  }

  resetRegistration() {
    this.newUser = { first_name: "", last_name: "", email: "", password: "" };
  }

  emptyArray() {
    this.errors.length = 0;
  }
}
