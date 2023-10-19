import { Component, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, forkJoin} from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-register-authorized',
  templateUrl: './register-authorized.component.html',
  styleUrls: ['./register-authorized.component.scss']
})
export class RegisterAuthorizedComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;
  messages: Message[] ;
  
  
  constructor(private backend: BackendService){
    
    this.messages = []
    
  }
  
  ngOnInit() {
    
  }
  
  isValidName(name:string) {
    
    const namePattern = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/;
    
    return namePattern.test(name);
    
  }
  
  uploadFiles(event:any) {
    
    const nameInput = document.getElementById('name') as HTMLInputElement;
    
    const nameValue = nameInput.value.trim(); 
    
    if (nameValue) {
      
      if(this.isValidName(nameValue)) {
        
        let files = event.files

        this.convertFilesToBase64(files).subscribe(base64images => {
          
          this.backend.registerNewAuthorizedPerson(nameValue, base64images).subscribe( response => {
            
            if(response.message == "Successfully register") {

              this.backend.updateEmbeddingsNotification().subscribe(updateresponse => {

                if(updateresponse.message == "Successfull") {

                  this.messages = [{ severity: 'success', detail: 'Files uploaded.' }];

                  nameInput.value = ""

                  this.fileUpload!.clear()

                } else {

                  this.messages = [{ severity: 'error', detail: updateresponse.message }];

                }

              })

            } else {
              
              this.messages = [{ severity: 'error', detail: response.message }];

              this.fileUpload!.clear()
              
            }
            
          })
          
        });
        
      } else {

        this.messages = [{ severity: 'warn', detail: 'The name should follow the pattern: BruceWayne \n ' }];

      }

    } else {
      
      this.messages = [{ severity: 'warn', detail: 'Name field is empty. Please enter a name.' }];
      
    }
  }
  
  convertFile(file: File): Observable<string> {
    
    const result = new ReplaySubject<string>(1);
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      
      if (event.target && event.target.result) {
        
        result.next(btoa(event.target.result.toString()));
        
      } else {
        
        result.error('Failed to read the file.');
        
      }
      
      result.complete();
    };
    
    reader.readAsBinaryString(file);
    
    return result;
  }
  
  convertFilesToBase64(eventFiles: FileList): Observable<string[]> {
    
    const base64Array: Observable<string>[] = [];
    
    for (let i = 0; i < eventFiles.length; i++) {
      
      const file = eventFiles[i];
      
      base64Array.push(this.convertFile(file));
      
    }
    
    return forkJoin(base64Array);
    
  }
  
  
  
  
}
