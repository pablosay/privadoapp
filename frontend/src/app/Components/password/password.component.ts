import { Component, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/Services/backend.service';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  @ViewChild('newPassword', { static: true }) passwordField!: Password;

  form: FormGroup;

  messages: Message[] ;

  constructor(private backend: BackendService, private fb:FormBuilder) {

    this.form = this.fb.group({

      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmation: ['', Validators.required]

    })

    this.messages = []

  }

  updatePassword(){

    const device = String(sessionStorage.getItem('device')) || '';

    const currentPassword = this.form.controls['currentPassword'].value

    const newPassword = this.form.controls['newPassword'].value

    const confirmation = this.form.controls['confirmation'].value

    const passwordStrength = this.passwordField?.meter?.strength

    if (confirmation !== newPassword) {

      this.messages = [{ severity: 'warn', detail: "The new password and confirmation doesn't match." }];

    } else if (passwordStrength !== 'strong') {

      this.messages = [{ severity: 'warn', detail: 'Select a stronger password.' }];

    } else {

      this.backend.updatePassword(device, currentPassword, newPassword).subscribe(response => {

        if(response.message === "Password updated"){

          this.messages = [{ severity: 'success', detail: 'Password updated.' }];

        } else {

          this.messages = [{ severity: 'error', detail: response.message }];

        }

      })

      
    }

  }

}
