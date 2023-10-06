import { Component } from '@angular/core';
import { Spoof } from 'src/Models/Models';

@Component({
  selector: 'app-intruders',
  templateUrl: './intruders.component.html',
  styleUrls: ['./intruders.component.scss']
})
export class IntrudersComponent {

  spoofs: Spoof[];

  constructor(){

    this.spoofs = []

  }

  ngOnInit(){

    this.spoofs.push(new Spoof(1,45,31,3,2001, "IHDNSKAOPAOWJS"));
    this.spoofs.push(new Spoof(21,45,25,7,1990, "AISNDAISNDOASDA"));
    this.spoofs.push(new Spoof(21,45,25,7,1990, "ASDASDASDASDEDEQ"));
    this.spoofs.push(new Spoof(21,45,25,7,1990, "ASDASDASDASDASDAS"));
    this.spoofs.push(new Spoof(21,45,25,7,1990, "ASDASDASDASDASDASD"));

  }

}
