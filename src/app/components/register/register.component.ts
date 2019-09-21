import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { HttpService } from './../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser:Object;
  errors:String[]=[];

  constructor(
    private _authService:AuthService,
    private _httpService:HttpService,
    private _router:Router,
  ) { 
    this.newUser = {email:'', password:''}
  }

  ngOnInit() {
  }

  register(){
    this._authService.registerUser(this.newUser)
    .subscribe(user => {
      this._httpService.userData(user = this.newUser = user['user']);
      this.emptyArray();
      if(user.error) {
        for (let key in user){
          this.errors.push(user[key]);
          this.newUser = {email:'', password:''}
          this._router.navigate(['/registration'])
        }
      } else {
        localStorage.setItem('token', user.token);
        this._router.navigate(['/user/home']);
      }
    })
  }

  emptyArray(){
    this.errors.length = 0;
  }

}
