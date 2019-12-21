import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../user.service";
import { AuthService } from "./../../auth.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor(
    private _userService: UserService,
    public _authService: AuthService
  ) {}

  loggedUser: object;

  ngOnInit() {
    if (this._authService.loggedIn()) {
      this._userService.currentUser.subscribe(user => {
        this.loggedUser = user;
      });
    }
  }
}
