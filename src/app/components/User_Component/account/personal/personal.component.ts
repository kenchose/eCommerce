import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../../user.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"]
})
export class PersonalComponent implements OnInit {
  user: any;

  constructor(
    private _userService: UserService,
    private _router: ActivatedRoute,
    private _route: Router
  ) {
    this.user = { first_name: "", last_name: "", email: "" };
  }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this._userService.currUser(params["userId"]).subscribe(user => {
        console.log("currentUser", user);
        this.user = user["user"];
      });
    });
  }

  userEdit() {
    this._userService.editUser(this.user).subscribe(editUser => {
      this.user = editUser["user"];
      this._userService.userData(editUser);
      this._route.navigate(["cartify/home"]);
    });
  }
}
