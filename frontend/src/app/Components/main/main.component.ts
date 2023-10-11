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
        icon: 'pi pi-fw pi-home',
        routerLink: ['/main/welcome']
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/main/register']
      }
      ,
      {
        label: 'Configuration',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/main/config']
      },
      {
        label: 'Log entries',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/main/logentries']
      },
      {
        label: 'Intruders',
        icon: 'pi pi-fw pi-ban',
        routerLink: ['/main/intruders']
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/login']
      }
    ];

  }

  toggleSideBar(){

    this.sidebarVisible = !this.sidebarVisible;

    console.log(this.sidebarVisible)

  }
}
