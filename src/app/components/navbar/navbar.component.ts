import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  oldUser:any;
  user:any
  currUser:any 
  errors:String[]=[];

  constructor(
    private _authService:AuthService,
    private _httpService:HttpService,
    private _router:Router,
    private _route:ActivatedRoute,
  ) { 
    this.oldUser = {email:'', password:''}
  }

  ngOnInit() {
  }

  login(){
    this._authService.userLogin(this.oldUser)
    .subscribe(user => {
      this._httpService.userData(user = this.user = user);
      this.emptyArray();
      if(user.errors) {
        for (let key in user.errors) {
          this.errors.push(user.errors[key]);
          this.resetLogin();
          this._router.navigate(['/']);
        }
      } else {
        localStorage.setItem('token', user.token)
        this._router.navigate(['/user/home'])
      }
    })
  }

  emptyArray(){
    this.errors.length = 0;
  }

  resetLogin(){
    this.oldUser = {email:'', password:''};
  }
}
