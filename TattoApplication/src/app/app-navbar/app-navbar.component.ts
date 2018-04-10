import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../shared/services/userService/index';
import { AuthTokenService } from './../shared/services/authToken/index';
import { Credentials } from './../shared/entities/index';
import { HomeComponent } from './../home/home.component';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  @ViewChild(HomeComponent) home: HomeComponent;
  submitted = false;
  registerForm: FormGroup;
  authenticated: boolean = false;
  signInForm: FormGroup;
  forgetPasswordForm: FormGroup;
  isUserLoggedIn: boolean;
  hasToken: any;
  constructor(private fb: FormBuilder,
    public userService: UserService,
    public authService: AuthTokenService,
    public route: Router) {
      // this.home.Authenticated();
    if (JSON.parse(localStorage.getItem('status')) == true) {
      this.authenticated = true;
    }
    this.signin();
    this.register();
    this.fogetPassword();
  }

  ngOnInit() {
  }
  signOut() {
    this.authService.logout();
    this.route.navigate(['/']);
    this.authenticated = JSON.parse(localStorage.getItem('status'));
  }
  formErrors = {
    'first_name': '',
    'last_name': '',
    'email': '',
    'password': ''
  }
  validationMessages = {
    'first_name': { 'required': 'Field is required.', },
    'last_name': { 'required': 'Field is required.', },
    'email': { 'required': 'Field is required.', },
    'password': { 'required': 'Field is required.', }
  }
  register() {
    this.submitted = false;
    this.registerForm = this.fb.group({
      first_name: [, [<any>Validators.required]],
      last_name: [, [<any>Validators.required]],
      email: [, [<any>Validators.required]],
      password: [, [<any>Validators.required]]
    })
    this.registerForm.valueChanges.subscribe(data => this.onValueChanges());
  }
  signin() {
    this.submitted = false;
    this.signInForm = this.fb.group({
      email: [, [<any>Validators.required]],
      password: [, [<any>Validators.required]]
    })

  }
  fogetPassword() {
    this.submitted = false;
    this.forgetPasswordForm = this.fb.group({
      email: [, [<any>Validators.required]]
    })

  }
  onValueChanges() {
    //console.log(this.resForm);
    if (!this.registerForm) { return; }
    const form = this.registerForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || this.submitted) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (this.formErrors[field].length < 1) {

            this.formErrors[field] += messages[key];
          }
        }
      }
    }
  }

  registerUser(value: any, valid: boolean) {
    console.log(value);
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.userService.RegisterUser(value).subscribe(data => {
      console.log(data);
    })

  }
  resetPassword(value: any, valid: boolean) {
    console.log(value);
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.userService.ResetPassword(value).subscribe(data => {
      console.log(data);
    })

  }
  signIn(value: any, valid: boolean) {
    console.log(value);
    this.submitted = true;
    if (valid == false) {
      return;
    }
    let credential = new Credentials();
    credential.email = value.email;
    credential.password = value.password;
    this.authService.signIn(credential).subscribe(data => {
      this.route.navigate(['/']);
      this.authenticated = JSON.parse(localStorage.getItem('status'));
    })
  }


}
