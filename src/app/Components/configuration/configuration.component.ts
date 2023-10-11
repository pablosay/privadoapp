import { Component } from '@angular/core';
import { AuthorizedName } from 'src/app/Models/Models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent {

  updateIpForm: FormGroup;

  updateWhatsAppNumberForm: FormGroup;

  updateIntervalForm: FormGroup;

  messages: Message[] ;

  names: AuthorizedName[]

  constructor(private fb: FormBuilder){

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

    this.names = []
    

  }

  ngOnInit() {

    this.names.push(new AuthorizedName("PabloAlejandroSayCutz"));
    this.names.push(new AuthorizedName("SuzanneEsperanzaGarciaRodriguez"));

  }

  setIpForProcessingServer(){

    let ip = String(this.updateIpForm.controls['ip'].value)

    this.updateIpForm.reset()

    this.messages = [{ severity: 'success', detail: 'IP Updated' }];

  }

  removeName(name: String){

    const indexToRemove = this.names.findIndex((item) => item.name === name);
    if (indexToRemove !== -1) {
        this.names.splice(indexToRemove, 1);
    }

    this.messages = [{ severity: 'success', detail: 'Successfully removed' }];

  }

  setVigilanceTimeIfIntruder(){

    let start = String(this.updateIntervalForm.controls['start'].value)

    let end = String(this.updateIntervalForm.controls['end'].value)

    if(this.validateTimeRange(start, end)){

      this.messages = [{ severity: 'success', detail: 'Updated time interval' }];

    } else {

      this.messages = [{ severity: 'warn', detail: 'Enter a valid interval' }];

    }

    this.updateIntervalForm.reset()


  }

  setWhatsAppNumber() {

    let number = String(this.updateWhatsAppNumberForm.controls['number'].value)

    this.updateWhatsAppNumberForm.reset()

    this.messages = [{ severity: 'success', detail: 'WhatsApp number updated' }];


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

  


}
