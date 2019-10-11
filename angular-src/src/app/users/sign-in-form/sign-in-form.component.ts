import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'mf-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  signInForm: FormGroup;
  wasValidated:boolean;
  // firstNameValid:boolean;
  // lastNameValid:boolean;
  emailIsValid:boolean;
  passwordValid:boolean;
  verifyPasswordValid:boolean;

  constructor() {
  }

  submit() {
    this.wasValidated = true;
    // this.firstNameValid = this.signInForm.controls.name.controls.firstName.valid;
    // this.lastNameValid = this.signInForm.controls.name.controls.lastName.valid;
    this.emailIsValid = this.signInForm.controls.email.valid;
    this.passwordValid = this.signInForm.controls.password.controls.password.valid;
    this.verifyPasswordValid = this.signInForm.controls.password.controls.validatePassword.valid;
  }


  ngOnInit() {
    this.wasValidated = false;
    // this.firstNameValid = true;
    // this.lastNameValid = true;
    this.emailIsValid = true;
    this.passwordValid = true;
    this.verifyPasswordValid = true;
    this.signInForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
      }),
      email: new FormControl('', [ Validators.required, Validators.pattern("[^ @]*@[^ @]*") ]),
      password: new FormGroup({
        password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
        validatePassword: new FormControl('', Validators.required)
      }),
    });
  }

}
