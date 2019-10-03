import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { AuthService } from "../../../auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  id: any;
  currUser: any;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this._authService.getUser();
    this._userService
      .currUser(userId)
      .subscribe(user => (this.currUser = user["user"]));
    const token = this._authService.getToken();
    // console.log("token", token);
    // const userToken = token.split(".")[1];
    // console.log("userToken", userToken);
    // this._userService.currUser(userToken).subscribe(user => {
    //   console.log("this worked", user);
    // });
  }
}
