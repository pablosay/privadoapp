import { Component } from '@angular/core';
import { Entry } from 'src/app/Models/Models'; 
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-log-entries',
  templateUrl: './log-entries.component.html',
  styleUrls: ['./log-entries.component.scss']
})
export class LogEntriesComponent {

  entries: Entry[]

  constructor(private backend: BackendService){

    this.entries = []

  }

  ngOnInit(){

    this.backend.getEntries().subscribe(response => {

      if(response.message == "Successfully retrived") {

        this.entries = response.entries!

      }

    })

  }

}
