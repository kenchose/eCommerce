import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../user.service";
import { HttpService } from "./../../../http.service";
// import { ENGINE_METHOD_DIGESTS } from "constants";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  currUser: any;

  constructor(
    private _userService: UserService,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    // this._userService.userData(currUser = this.currUser = currUser)
  }
}
