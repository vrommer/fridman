import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mf-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  logInForm: FormGroup;
  wasValidated: boolean;
  emailIsValid: boolean;
  passwordValid: boolean;

  constructor() { }

  submit() {
    this.wasValidated = true;
    this.emailIsValid = this.logInForm.controls.email.valid;
    this.passwordValid = this.logInForm.controls.password.valid;
  }

  ngOnInit() {
    this.wasValidated = false;
    this.emailIsValid = true;
    this.passwordValid = true;
    this.logInForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.pattern('[^ @]*@[^ @]*') ]),
      password: new FormControl('', Validators.required)
    });
  }

}
