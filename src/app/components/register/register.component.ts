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

  constructor(
    private _authService:AuthService,
    private _flashMessage: FlashMessagesService,
    private _router:Router,
  ) { 
    this.newUser = {email:'', password:''}
  }

  ngOnInit() {
    // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        // this._flashMessage.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }

  register(){
    this._authService.registerUser(this.newUser)
    .subscribe(user => {
      console.log(user);
      this._router.navigate(['/user/home']);
    })
  }
}
