import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizedPerson, ImageInformation } from 'src/app/Models/Models';
import { BackendService } from 'src/app/Services/backend.service';
import { ShareAuthoPersonInfoService } from 'src/app/Services/share-autho-person-info.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Message } from 'primeng/api';
import { Observable, forkJoin } from 'rxjs';
import { ReplaySubject } from 'rxjs';

const BackEndApi = environment.urlBackend;

@Component({
  selector: 'app-review-pictures',
  templateUrl: './review-pictures.component.html',
  styleUrls: ['./review-pictures.component.scss']
})


export class ReviewPicturesComponent {
  
  authorizedPerson: AuthorizedPerson | undefined;
  
  images: ImageInformation[] | undefined;
  
  messages: Message[] ;
  
  
  
  constructor(private shareauthoperson: ShareAuthoPersonInfoService, private router: Router, private backend:BackendService, private sanitizer: DomSanitizer){
    
    this.messages = []
    
    this.shareauthoperson.getAuthorizedPerson().subscribe(authoperson => {
      
      if(authoperson.name == "") {
        
        this.router.navigateByUrl("/main/config")
        
      } else {
        
        this.authorizedPerson = authoperson
        
        this.backend.getImagesFromAuthorizedPerson(this.authorizedPerson.id).subscribe(response => {
          
          if(response.message == "Obtained successfully") {
            
            this.images = response.images!
            
          }
          
        })
        
      }
      
    });
    
  }
  
  ngOnInit(){
    
    
    
  }
  
  return(){
    
    this.router.navigateByUrl("/main/config")
    
  }
  
  displayImage(key: string){
    
    return BackEndApi + "/images/pipeImage/" + key
    
  }
  
  deleteImage(id: number, key: string) {
    
    this.backend.deleteImageFromAuthorizedPerson(id, key).subscribe(response => {
      
      if(response.message == "Successfully deleted") {
        
        const indexToRemove = this.images!.findIndex((item) => item.id === id);
        
        if (indexToRemove !== -1) {
          
          this.images!.splice(indexToRemove, 1);

          this.backend.updateEmbeddingsNotification().subscribe(notificationresponse => {

            if(notificationresponse.message == "Successfull") {

              console.log("Embeddings actualizados")

            } else {

              console.log(notificationresponse.message)

            }

          })
          
          this.messages = [{ severity: 'success', detail: 'Successfully removed' }];
          
        }
        
      } else {
        
        this.messages = [{ severity: 'error', detail: response.message }]
        
      }
      
    })
    
  }
  
  uploadFiles(event:any) {
    
    let files = event.files


    
    this.convertFilesToBase64(files).subscribe(base64images => {
      
      this.backend.uploadNewImageFromAuthorizedUser(this.authorizedPerson!.id, base64images).subscribe( response => {
        
        if(response.message == "Successfully uploaded") {
          
          this.messages = [{ severity: 'success', detail: 'Files uploaded.' }];

          this.backend.getImagesFromAuthorizedPerson(this.authorizedPerson!.id).subscribe(responseGetImages => {
          
            if(responseGetImages.message == "Obtained successfully") {
              
              this.images = responseGetImages.images!

              this.backend.updateEmbeddingsNotification().subscribe(notificationresponse => {

                if(notificationresponse.message == "Successfull") {

                  console.log("Notification made")

                } else {

                  console.log(notificationresponse.message)

                }

              })
              
            } else {

              this.messages = [{ severity: 'error', detail: response.message }];

            }
            
          })
          
        } else {
          
          this.messages = [{ severity: 'error', detail: response.message }];
          
        }
        
      })
      
    });
    
    
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
