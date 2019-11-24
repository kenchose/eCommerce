import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../../user.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"]
})
export class PersonalComponent implements OnInit {
  user: object;
  success: boolean = false;
  constructor(
    private _userService: UserService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this._userService.currUser(params["userId"]).subscribe(user => {
        this.user = user["user"];
      });
    });
  }

  userEdit() {
    this._userService.editUser(this.user).subscribe(editUser => {
      this.user = editUser["user"];
      this._userService.userData(editUser);
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
      this._userService.currUser(this.user["_id"]).subscribe(user => {
        this.user = user["user"];
      });
    });
  }
}
