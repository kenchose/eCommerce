import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  oldUser:any;
  user:Object
  currUser:Object 
  errors:String[]=[];

  constructor(
    private _authService:AuthService,
    private _router:Router,
  ) { 
    this.oldUser = {email:'', password:''}
  }

  ngOnInit() {
  }

  login(){
    this._authService.userLogin(this.oldUser)
    .subscribe(user => {
      if(user.error) {
        console.log(user.error)
        for (let key in user) {
          this.errors.push(user[key]);
          console.log(this.errors)
          this.oldUser ={email:'', password:''};
          // this._router.navigate(['/']);
        }
      } else {
        this._router.navigate(['/user/home'])
      }
    })
  }

  resetLogin(){
    this.oldUser = {email:'', password:''};
  }
}
