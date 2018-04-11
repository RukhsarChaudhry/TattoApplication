import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TattoService } from './../shared/services/tattoService/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tatto',
  templateUrl: './create-tatto.component.html',
  styleUrls: ['./create-tatto.component.css']
})
export class CreateTattoComponent implements OnInit {
  private base64textString: String = "";
  @ViewChild('fileInput') fileInput: ElementRef;
  submitted = false;
  TattoForm: FormGroup;
  UpdateForm: FormGroup;
  tatto: any;
  update: any;
  constructor(public tattoService: TattoService, private fb: FormBuilder) {
    this.createTattoForm();
  }

  ngOnInit() {
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
  createTattoForm() {
    this.submitted = false;
    this.TattoForm = this.fb.group({
      artist_name: [, [<any>Validators.required]],
      screen_name: [, [<any>Validators.required]],
      body_placement: [, [<any>Validators.required]],
      category: [, [<any>Validators.required]],
      color: [, [<any>Validators.required]],
      description: [, [<any>Validators.required]],
      image_name: [, [<any>Validators.required]]
      // avatar: [, [<any>Validators.required]]
    })
    this.TattoForm.valueChanges.subscribe(data => this.onValueChanges());
  }
  onValueChanges() {
    //console.log(this.resForm);
    if (!this.TattoForm) { return; }
    const form = this.TattoForm;

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
  onFileChange(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
  clearFile() {
    this.TattoForm.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  createTatto(value: any, valid: boolean) {
    value.avatar = this.base64textString;
    console.log(value);
    console.log(valid);
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.tattoService.createTatto(value).subscribe(data => {
      this.createTattoForm();
      console.log(data);
    });
  }

}
