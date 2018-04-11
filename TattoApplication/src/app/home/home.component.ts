import { Component, OnInit } from '@angular/core';
import { TattoService } from './../shared/services/tattoService/index';
import { AuthTokenService } from './../shared/services/authToken/index';
import { UserService } from './../shared/services/userService/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated: any = false;
  message: any;
  subscription: Subscription;
  imgUrl: any;
  url: any[];
  constructor(public tattoService: TattoService,
    public userService: UserService,
    public auth_service: AuthTokenService) {
    this.auth_service.userEvent$.subscribe(data => {
      this.authenticated = data;
    },
      error => {
        this.authenticated = false;

      });
    if (JSON.parse(localStorage.getItem('status')) == true) {
      this.authenticated = true;
    }
    if (this.authenticated == true) {
      this.getAllTatto();
    }
  }

  ngOnInit() {
  }
  getAllTatto() {
    this.tattoService.getTatto().subscribe(data => {
      console.log(data.tattos);
      this.imgUrl = data.tattos;
      var img = [];
      var temp = [];
      for (var index = 0; index < this.imgUrl.length; index++) {
        img = [this.imgUrl[index].image_url];
        temp.push(img);
      }
      this.url = temp;
      console.log(this.url);
    },
      Error => {
        console.log("Something went wrong");
      }
    );

  }

}
