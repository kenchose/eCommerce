import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  oldUser:Object[]=[];
  constructor(
    private _authService:AuthService
  ) { }

  ngOnInit() {
  }

  login(){
    this._authService.userLogin(this.oldUser)
    .subscribe(user => console.log(user))
  }
}
