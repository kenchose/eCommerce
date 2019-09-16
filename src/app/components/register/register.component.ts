import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser:any;
  errors:String[]=[];

  constructor(
    private _authService:AuthService,
    private _flashMessage: FlashMessagesService,
    private _router:Router,
  ) { 
    this.newUser = {email:'', password:''}
  }

  ngOnInit() {
    // this._flashMessage.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }

  register(){
    this._authService.registerUser(this.newUser)
    .subscribe(user => {
      console.log(user);
      // if(user.error) {
      //   for (let key in user){
      //     this.errors.push(user[key]);
      //     this.newUser = {email:'', password:''}
      //     this._router.navigate(['/registration'])
      //   }
      // } else {
        this._router.navigate(['/user/home']);
      // }
    })
  }
}
