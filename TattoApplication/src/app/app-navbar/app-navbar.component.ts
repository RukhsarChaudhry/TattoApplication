import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  submitted: any = false;
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
    this.authService.userEvent$.subscribe(data => {
      this.authenticated = data;
    })
    this.authenticated = JSON.parse(localStorage.getItem('status'));
    this.signin();
    this.register();
    this.fogetPassword();
  }

  ngOnInit() {
  }
  signOut() {
    this.authService.logout();
    this.authenticated = JSON.parse(localStorage.getItem('status'));
    this.authService.userEvent$.subscribe(data => {
      this.authenticated = data;
    })
  }
  formErrors = {
    'first_name': '',
    'last_name': '',
    'username': '',
    'email': '',
    'password': ''
  }
  validationMessages = {
    'first_name': { 'required': 'Field is required.', },
    'last_name': { 'required': 'Field is required.', },
    'username': { 'required': 'Field is required.', },
    'email': { 'required': 'Field is required.', },
    'password': { 'required': 'Field is required.', }
  }
  register() {
    this.submitted = false;
    this.registerForm = this.fb.group({
      first_name: [, [<any>Validators.required]],
      last_name: [, [<any>Validators.required]],
      username: [, [<any>Validators.required]],
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
    this.signInForm.valueChanges.subscribe(data => this.onValueChanged());
  }
  fogetPassword() {
    this.submitted = false;
    this.forgetPasswordForm = this.fb.group({
      email: [, [<any>Validators.required]]
    })
    this.forgetPasswordForm.valueChanges.subscribe(data => this.onValueChange());
  }
  onValueChange() {
    //console.log(this.resForm);
    if (!this.forgetPasswordForm) { return; }
    const form = this.forgetPasswordForm;

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
  onValueChanged() {
    console.log(this.signInForm);
    if (!this.signInForm) { return; }
    const form = this.signInForm;

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
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.authService.RegisterUser(value).subscribe(data => {
      this.register();
      this.authenticated = JSON.parse(localStorage.getItem('status'));
      this.authService.userEvent$.subscribe(data => {
        this.authenticated = data;
      });
    },
      Error => {
        console.log("Something went wrong");
      })

  }
  resetPassword(value: any, valid: boolean) {
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.userService.ResetPassword(value).subscribe(data => {
      this.fogetPassword();
    },
      Error => {
        console.log("Something went wrong");
      })

  }
  signIn(value: any, valid: boolean) {
    this.submitted = true;
    if (valid == false) {
      return;
    }
    let credential = new Credentials();
    credential.email = value.email;
    credential.password = value.password;
    this.authService.signIn(credential).subscribe(data => {
      this.signin();
      this.authenticated = JSON.parse(localStorage.getItem('status'));
      this.authService.userEvent$.subscribe(data => {
        this.authenticated = data;
      });
    },
      Error => {
        console.log("Something went wrong");
      })
  }


}
