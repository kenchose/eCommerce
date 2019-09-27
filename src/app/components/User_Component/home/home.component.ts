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
  user: any;
  id: any;
  currUser: any;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: localStorage.getItem("token") })
    };
    this._userService.currentUser.subscribe(user => {
      console.log("before setting value to user", user);
      this.user = user;
    });
  }
}
