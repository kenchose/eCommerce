import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../user.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  user: object;
  success: boolean = false;
  userId: string;
  errors: string[] = [];
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._userService.currUser(params["userId"]).subscribe(user => {
        this.user = user["user"];
        this.userId = this.user["_id"];
      });
    });
  }

  userEdit(myForm: NgForm) {
    this._userService.editUser(this.user).subscribe((editUser: any) => {
      this.resetArray();
      if (editUser.error) {
        this.errors.push(editUser.error);
        this.user["local"].email = editUser["user"]["local"].email;
        this.resetArray();
        this._router.navigate(["/account/", this.userId]);
      } else {
        this.success = true;
        this.user = editUser["user"];
        this._userService.userData(editUser);
        setTimeout(() => {
          this.success = false;
        }, 4000);
        this._userService.currUser(this.user["_id"]).subscribe(user => {
          this.user = user["user"];
        });
      }
    });
  }

  resetArray() {
    this.errors.length = 0;
  }
}
