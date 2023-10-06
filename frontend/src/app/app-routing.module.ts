import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LogEntriesComponent } from './log-entries/log-entries.component';
import { RegisterAuthorizedComponent } from './register-authorized/register-authorized.component';
import { IntrudersComponent } from './intruders/intruders.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'main', component: MainComponent, children: [

    {path: 'config', component: ConfigurationComponent},
    {path: 'logentries', component: LogEntriesComponent},
    {path: 'register', component: RegisterAuthorizedComponent},
    {path: 'intruders', component: IntrudersComponent},
    {path: 'welcome', component: WelcomeComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
