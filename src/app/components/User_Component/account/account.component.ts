import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../user.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  loggedUser: object;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._userService.currentUser.subscribe(user => {
      //shared user data
      console.log("user", user);
      this.loggedUser = user;
    });
  }
}
