import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { AuthService } from '../../../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user:any;

  constructor(
    private _httpService:HttpService,
    private _authService:AuthService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._httpService.currentUser.subscribe(user => {
      console.log('before setting value to user', user)
      this.user = user['user']
      console.log('after datasource', this.user)
    })
  }

}
