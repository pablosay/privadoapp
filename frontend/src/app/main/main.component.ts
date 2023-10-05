import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  
  sidebarVisible = true;

  items: MenuItem[] | undefined;

  constructor(){
  }
  
  ngOnInit() {

    this.items = [
      {
        label: 'Welcome',
        icon: 'pi pi-fw pi-home'
      },
      {
        label: 'Configuration',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/main/config']
      },
      {
        label: 'Log entries',
        icon: 'pi pi-fw pi-book'
      },
      {
        label: 'Intruders',
        icon: 'pi pi-fw pi-ban'
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out'
      }
    ];

  }

  toggleSideBar(){

    this.sidebarVisible = !this.sidebarVisible;

    console.log(this.sidebarVisible)

  }
}
