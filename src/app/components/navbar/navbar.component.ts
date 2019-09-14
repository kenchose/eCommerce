import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  oldUser:any;
  user:Object
  currUser:Object 

  constructor(
    private _authService:AuthService,
    private _router:Router
  ) { 
    this.oldUser = {email:'', password:''}
  }

  ngOnInit() {
  }

  login(){
    console.log('ts file', this.oldUser)
    this._authService.userLogin(this.oldUser)
    .subscribe(user => {
      console.log(user);
      // user = this.currUser;
      this._router.navigate(['/user/home'])
    })
  }
}
