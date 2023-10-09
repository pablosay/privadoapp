import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin:FormGroup;

  constructor(private router: Router, private fb:FormBuilder){

    this.formLogin = this.fb.group({

      model: ['',[Validators.required]],
      password: ['', [Validators.required]]

    })

  }

  ngOnInit(): void {}

  tryLogin(){

    let model = String(this.formLogin.controls['model'].value);

    let password = String(this.formLogin.controls['password'].value);

    console.log(model + password)

    this.router.navigateByUrl("/main/welcome")

  }

}
