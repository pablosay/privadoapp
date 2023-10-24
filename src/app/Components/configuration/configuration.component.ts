import { Component } from '@angular/core';
import { AuthorizedPerson } from 'src/app/Models/Models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { BackendService } from 'src/app/Services/backend.service';
import { ShareAuthoPersonInfoService } from 'src/app/Services/share-autho-person-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent {

  progressBarVisible: boolean;
  
  updateIpForm: FormGroup;
  
  updateWhatsAppNumberForm: FormGroup;
  
  updateIntervalForm: FormGroup;
  
  messages: Message[] ;
  
  authorizedUsers: AuthorizedPerson[]
  
  currentPhoneNumber: string;
  currentStartVigilanceTime: string;
  currentEndVigilanceTime: string;
  currentIp:string;
  currentStatus:string;
  
  constructor(private fb: FormBuilder, private backend: BackendService, private shareauthoperson: ShareAuthoPersonInfoService, private router: Router){

    this.progressBarVisible = false
    
    this.currentStatus = "active"
    this.currentPhoneNumber = ""
    this.currentStartVigilanceTime = ""
    this.currentEndVigilanceTime = ""
    this.currentIp = ""
    
    
    this.messages = []
    
    this.updateIpForm = fb.group({
      ip: ['', [Validators.required , Validators.pattern('192.168.[0-9]+.[0-9]+')]]
    })
    
    this.updateWhatsAppNumberForm = fb.group({
      number: ['', [Validators.required]]
    })
    
    this.updateIntervalForm = fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]]
    })
    
    this.authorizedUsers = []
    
    
  }
  
  ngOnInit() {
    
    this.backend.getProcessingServerIp().subscribe(response => {
      
      if(response.message = "Successfully obtained") {
        
        this.currentIp = response.ip!
        
      } else {
        
        this.currentIp = "Server is down"
        
      }
      
    });
    
    this.backend.getVigilanceIntervalTime().subscribe(response => {
      
      if(response.message = "Successfully obtained") {
        
        this.currentStartVigilanceTime = response.start!
        
        this.currentEndVigilanceTime = response.end!
        
      } else {
        
        this.currentIp = "Server is down"
        
      }
      
    });
    
    this.backend.getWhatsAppNumber().subscribe(response => {
      
      if(response.message = "Successfully obtained") {
        
        this.currentPhoneNumber = response.number
        
      } else {
        
        this.currentIp = "Server is down"
        
      }
      
    });
    
    this.backend.getAuthorizedPersons().subscribe(response => {
      
      if(response.message == "Obtained successfully") {
        
        this.authorizedUsers = response.authorizedUsers!
        
      } else {
        
        this.messages = [{ severity: 'error', detail: response.message}];
        
      }
      
    })

    this.backend.getDeviceStatus().subscribe(response => {

      if(response.message == "Successfully obtained") {

        this.currentStatus = response.status!

      } 

    })
    
  }
  
  setIpForProcessingServer(){
    
    let ip = String(this.updateIpForm.controls['ip'].value)
    
    this.backend.updateProcessingServerIp(ip).subscribe(response => {
      
      if(response.message == "Successfully updated") {
        
        this.currentIp = ip
        
        this.updateIpForm.reset()
        
        this.messages = [{ severity: 'success', detail: 'IP Updated' }];
        
      } else {
        
        this.messages = [{ severity: 'error', detail: response.message }];
        
      }
      
    })
    
  }
  
  removeName(id: number){

    this.progressBarVisible = true
    
    this.backend.deleteAuthorizedPerson(id).subscribe(response => {
      
      if(response.message == "Successfully deleted") {
        
        const indexToRemove = this.authorizedUsers.findIndex((item) => item.id === id);

        if (indexToRemove !== -1) {

          this.authorizedUsers.splice(indexToRemove, 1);

          this.messages = [{ severity: 'success', detail: 'Successfully removed' }];

          this.backend.updateEmbeddingsNotification().subscribe(notificationresponse => {

            if(notificationresponse.message == "Successfull") {

              console.log("Notification made")

            } else {

              console.log(notificationresponse.message)

            }

          })

        }

      } else {

        this.messages = [{ severity: 'error', detail: response.message }];

      }

      this.progressBarVisible = false
      
    });
    
    
    
  }
  
  setVigilanceTimeIfIntruder(){
    
    let start = String(this.updateIntervalForm.controls['start'].value)
    
    let end = String(this.updateIntervalForm.controls['end'].value)
    
    if(this.validateTimeRange(start, end) && start != end){
      
      this.backend.updateVigilanceTimeInterval(start, end).subscribe(response => {
        
        if(response.message == "Successfully updated time interval") {
          
          this.currentStartVigilanceTime = start
          
          this.currentEndVigilanceTime = end
          
          this.messages = [{ severity: 'success', detail: 'Time interval updated' }];
          
          this.updateIntervalForm.reset()
          
        } else {
          
          this.messages = [{ severity: 'error', detail: response.message }];
          
        }
        
      })
      
    } else {
      
      this.messages = [{ severity: 'warn', detail: 'Enter a valid interval' }];
      
    }
    
    
    
    
  }
  
  setWhatsAppNumber() {
    
    let number = String(this.updateWhatsAppNumberForm.controls['number'].value)
    
    this.backend.updateWhatsAppNumber(number).subscribe(response => {
      
      if(response.message == "Successfully updated") {
        
        this.currentPhoneNumber = number
        
        this.messages = [{ severity: 'success', detail: 'WhatsApp number updated' }];
        
        this.updateWhatsAppNumberForm.reset()
        
      } else {
        
        this.messages = [{ severity: 'error', detail:response.message }];
        
      }
      
    })
    
    
    
    
    
    
  }
  
  validateTimeRange(time1: string, time2: string): boolean {
    
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);
    
    if ((hour1 < 0 || hour1 > 23 || minute1 < 0 || minute1 > 59) ||(hour2 < 0 || hour2 > 23 || minute2 < 0 || minute2 > 59)) {
      
      this.messages = [{ severity: 'warn', detail: 'Enter a valid hour' }];
      
      return false;
      
    }
    
    return true
    
  }

  editPictures(person: AuthorizedPerson){

    this.shareauthoperson.setAuthorizedPerson(person);

    this.router.navigateByUrl('/main/review-pictures')

  }

  activateDevice() {

    this.backend.setDeviceStatus().subscribe(response => {

      if(response.message == "Successfully updated") {

        this.currentStatus = "active"

      }

    })

  }
  
  
  
  
}
