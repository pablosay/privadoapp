import { Component } from '@angular/core';
import { Intruder } from 'src/app/Models/Models';
import { BackendService } from 'src/app/Services/backend.service';
import { environment } from 'src/environments/environment';

const BackEndApi = environment.urlBackend;

@Component({
  selector: 'app-intruders',
  templateUrl: './intruders.component.html',
  styleUrls: ['./intruders.component.scss']
})
export class IntrudersComponent {

  intruders: Intruder[];

  visible: boolean;

  currentKey:string;

  constructor(private backend:BackendService){

    this.intruders = []

    this.visible = false

    this.currentKey = ""

  }

  ngOnInit(){

    this.backend.getIntruders().subscribe(response => {

      if(response.message == "Successfully retrived") {

        this.intruders = response.intruders!

      }

    })

  }

  displayImage(){
    
    return BackEndApi + "/images/pipeImage/" + this.currentKey
    
  }

  showPopUp(key:string){

    this.currentKey = key

    this.visible = true;

  }



}
