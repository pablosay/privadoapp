import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin:FormGroup;

  messages: Message[] ;

  constructor(private router: Router, private fb:FormBuilder, private backend: BackendService){

    this.messages = []

    this.formLogin = this.fb.group({

      device: ['',[Validators.required]],
      password: ['', [Validators.required]]

    })

  }

  ngOnInit(): void {}

  tryLogin(){

    let device = String(this.formLogin.controls['device'].value);

    let password = String(this.formLogin.controls['password'].value);

    this.backend.logIn(device, password).subscribe(response => {

      if(response.message == "Logged in") {

        sessionStorage.setItem("token", response.authorizationToken!)

        sessionStorage.setItem("refreshToken", response.refreshToken!)

        this.router.navigateByUrl("/main/welcome")

      } else {

        this.messages = [{ severity: 'error', detail: response.message }]

      }

    })


    

  }

}
