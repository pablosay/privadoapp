import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {InputTextModule } from 'primeng/inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { ConfigurationComponent } from './Components/configuration/configuration.component';
import { MenuModule } from 'primeng/menu';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { LogEntriesComponent } from './Components/log-entries/log-entries.component';
import { RegisterAuthorizedComponent } from './Components/register-authorized/register-authorized.component';
import { IntrudersComponent } from './Components/intruders/intruders.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ReviewPicturesComponent } from './Components/review-pictures/review-pictures.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ConfigurationComponent,
    WelcomeComponent,
    LogEntriesComponent,
    RegisterAuthorizedComponent,
    IntrudersComponent,
    ReviewPicturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    NoopAnimationsModule,
    MenubarModule,
    MenuModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    FileUploadModule,
    ReactiveFormsModule,
    CarouselModule,
    TagModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
