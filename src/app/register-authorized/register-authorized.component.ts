import { Component, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
@Component({
  selector: 'app-register-authorized',
  templateUrl: './register-authorized.component.html',
  styleUrls: ['./register-authorized.component.scss']
})
export class RegisterAuthorizedComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;
  messages: Message[] ;
  

  constructor(){

    this.messages = []

  }

  ngOnInit() {

  }

  uploadFiles(event:any) {

    const nameInput = document.getElementById('name') as HTMLInputElement;

    const nameValue = nameInput.value.trim(); 

    if (nameValue) {

      nameInput.value = ""

      this.fileUpload!.clear();

      console.log("Multiple Files are uploaded: ", event.files);

      this.messages = [{ severity: 'success', detail: 'Files uploaded.' }];

    } else {

      this.messages = [{ severity: 'warn', detail: 'Name field is empty. Please enter a name.' }];

    }
  }

}
