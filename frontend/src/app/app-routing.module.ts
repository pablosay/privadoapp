import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { ConfigurationComponent } from './Components/configuration/configuration.component';
import { LogEntriesComponent } from './Components/log-entries/log-entries.component';
import { RegisterAuthorizedComponent } from './Components/register-authorized/register-authorized.component';
import { IntrudersComponent } from './Components/intruders/intruders.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ReviewPicturesComponent } from './Components/review-pictures/review-pictures.component';
import { authorizationGuard } from './Guards/authorization.guard';
import { PasswordComponent } from './Components/password/password.component';



const routes: Routes = [
  
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'main', component: MainComponent, canActivate:[authorizationGuard] ,children: [

    {path: 'config', component: ConfigurationComponent},
    {path: 'logentries', component: LogEntriesComponent},
    {path: 'register', component: RegisterAuthorizedComponent},
    {path: 'intruders', component: IntrudersComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'review-pictures', component: ReviewPicturesComponent},
    {path: 'password', component: PasswordComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
