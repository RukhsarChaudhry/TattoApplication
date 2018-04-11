import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TattoService } from './../shared/services/tattoService/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-tattos',
  templateUrl: './all-tattos.component.html',
  styleUrls: ['./all-tattos.component.css']
})
export class AllTattosComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  submitted = false;
  UpdateForm: FormGroup;
  tatto: any;
  update: any;
  imgUrl: any;
  url: any[];
  updateValue: any;
  base64textString: any;
  constructor(public tattoService: TattoService, private fb: FormBuilder) {
    this.updateTattoForm();
    this.getAllTatto();
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
        img = [{ 'id': this.imgUrl[index].id, 'url': this.imgUrl[index].image_url }];
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
  getId(id: any) {
    console.log(id);
    var index = this.imgUrl.findIndex(a => a.id == id);
    this.updateValue = this.imgUrl[index];
    console.log(this.updateValue);
    this.resetForm(this.updateValue);
  }
  resetForm(values: any) {
    this.submitted = false;
    this.UpdateForm = this.fb.group({
      artist_name: [values.artist_name, [<any>Validators.required]],
      screen_name: [values.screen_name, [<any>Validators.required]],
      body_placement: [values.body_placement, [<any>Validators.required]],
      category: [values.category, [<any>Validators.required]],
      color: [values.color, [<any>Validators.required]],
      description: [values.description, [<any>Validators.required]],
      image_name: [values.image_name, [<any>Validators.required]]
      // avatar: [, [<any>Validators.required]]
    })
    this.UpdateForm.valueChanges.subscribe(data => this.onValueChanges());
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
      image_name: [, [<any>Validators.required]]
      // avatar: [, [<any>Validators.required]]
    })
    this.UpdateForm.valueChanges.subscribe(data => this.onValueChanges());
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
      let index = this.url.findIndex(a => a[0].id == id);
      if (index > -1) {
        this.url.splice(index, 1);
      }
    },
      Error => {
        console.log("Something went wrong");
      });
  }
  updateTato(value: any, valid: boolean) {
    value.avatar = this.base64textString;
    this.submitted = true;
    if (valid == false) {
      return;
    }
    this.tattoService.updateTatto(value).subscribe(data => {
      this.updateTattoForm();
      console.log(data);
    },
      Error => {
        console.log("Something went wrong");
      }
    );

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
    this.UpdateForm.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }



}
