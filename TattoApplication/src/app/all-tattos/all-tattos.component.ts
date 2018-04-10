import { Component, OnInit } from '@angular/core';
import { TattoService } from './../shared/services/tattoService/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-tattos',
  templateUrl: './all-tattos.component.html',
  styleUrls: ['./all-tattos.component.css']
})
export class AllTattosComponent implements OnInit {
  submitted = false;
  UpdateForm: FormGroup;
  tatto: any;
  update: any;
  constructor(public tattoService: TattoService, private fb: FormBuilder) {
    this.updateTattoForm();
    this.getAllTatto();
  }

  ngOnInit() {
  }
  getAllTatto() {
    this.tattoService.getTatto().subscribe(data => {
      console.log(data);
      this.tatto = data.tattos;
      this.update = data.tattos[0];
      console.log(this.update);
      console.log(this.update.id);
    }
    );

  }
  formErrors = {
    'artist_name': '',
    'screen_name': '',
    'body_placement': '',
    'category': '',
    'color': '',
    'description': '',
    'image_name': '',
    'avatar': ''
  }
  validationMessages = {
    'artist_name': { 'required': 'Field is required.', },
    'screen_name': { 'required': 'Field is required.', },
    'body_placement': { 'required': 'Field is required.', },
    'category': { 'required': 'Field is required.', },
    'color': { 'required': 'Field is required.', },
    'description': { 'required': 'Field is required.', },
    'image_name': { 'required': 'Field is required.', },
    'avatar': { 'required': 'Field is required.', }
  }
  updateTattoForm() {
    this.submitted = false;
    this.UpdateForm = this.fb.group({
      artist_name: [, [<any>Validators.required]],
      screen_name: [, [<any>Validators.required]],
      body_placement: [, [<any>Validators.required]],
      category: [, [<any>Validators.required]],
      color: [, [<any>Validators.required]],
      description: [, [<any>Validators.required]],
      image_name: [, [<any>Validators.required]],
      avatar: [, [<any>Validators.required]]
    })
  }
  onValueChanges() {
    //console.log(this.resForm);
    if (!this.UpdateForm) { return; }
    const form = this.UpdateForm;

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
  delete(id: any) {
    console.log(id);
    this.tattoService.deleteTatto(id).subscribe(data => {
      console.log(data);
    });
  }
  updateTato(value: any, valid: boolean) {
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.tattoService.updateTatto(value).subscribe(data => {
      console.log(data);
    });

  }



}
