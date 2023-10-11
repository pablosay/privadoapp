import { Component } from '@angular/core';
import { Entry } from 'src/app/Models/Models'; 

@Component({
  selector: 'app-log-entries',
  templateUrl: './log-entries.component.html',
  styleUrls: ['./log-entries.component.scss']
})
export class LogEntriesComponent {

  entries: Entry[]

  constructor(){

    this.entries = []
    

  }

  ngOnInit(){

    this.entries.push(new Entry(1,45,31,3,2001, "PabloAlejandroSayCutz"));
    this.entries.push(new Entry(21,45,25,7,1990, "SuzanneEsperanzaGarciaRodriguez"));
    this.entries.push(new Entry(18,0,12,4,2005, "PabloAlejandroSayCutz"));
    this.entries.push(new Entry(3,0, 30,11,2012, "SuzanneEsperanzaGarciaRodriguez"));
    this.entries.push(new Entry(17,0, 18,9,1985, "PabloAlejandroSayCutz"));
    this.entries.push(new Entry(11,0, 3,6,2018, "SuzanneEsperanzaGarciaRodriguez"));
    this.entries.push(new Entry(12,0, 8,12,2002, "LionelAndresMessi"));
    this.entries.push(new Entry(23,0, 21,3,1998, "PabloAlejandroSayCutz"));
    this.entries.push(new Entry(18,0, 14,10,2015, "LionelAndresMessi"));
    this.entries.push(new Entry(15,0, 2,5,2007, "LionelAndresMessi"));
    this.entries.push(new Entry(19,8, 9,8,1982, "PabloAlejandroSayCutz"));
    this.entries.push(new Entry(21,18,27,1,2011, "LionelAndresMessi"));
    this.entries.push(new Entry(0,75, 5,6,1995, "PabloAlejandroSayCutz"));

  }

}
