import { Component } from '@angular/core';
import { AuthorizedName } from 'src/Models/Models';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent {

  names: AuthorizedName[]

  constructor(){

    this.names = []
    

  }

  ngOnInit() {

    this.names.push(new AuthorizedName("Pablo"));
    this.names.push(new AuthorizedName("Suzanne"));

  }

  removeName(name: String){

    const indexToRemove = this.names.findIndex((item) => item.name === name);
    if (indexToRemove !== -1) {
        this.names.splice(indexToRemove, 1);
    }

  }

  


}
