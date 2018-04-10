import { Component, OnInit } from '@angular/core';
import { TattoService } from './../shared/services/tattoService/index';
import { AuthTokenService } from './../shared/services/authToken/index';
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
  constructor(public tattoService: TattoService,
    public auth_service: AuthTokenService) {
    if (JSON.parse(localStorage.getItem('status')) == true) {
      this.authenticated = true;
      this.getAllTatto();
    }
  }
  Authenticated() {
    if (JSON.parse(localStorage.getItem('status')) == true) {
      this.authenticated = true;
    }
  }
  ngOnInit() {
  }
  getAllTatto() {
    this.tattoService.getTatto().subscribe(data => {
      console.log(data);
    }
    );

  }

}
