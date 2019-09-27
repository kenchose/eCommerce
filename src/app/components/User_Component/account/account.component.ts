import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../user.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  id: number;
  currUser: object;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._userService.userAccount(params["id"]).subscribe(user => {
        this.currUser = user["user"];
        console.log("currUser", this.currUser);
      });
    });
  }
}
