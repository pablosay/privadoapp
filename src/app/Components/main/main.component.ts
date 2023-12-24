import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  
  sidebarVisible = true;

  items: MenuItem[] | undefined;

  constructor(private router:Router, private backend: BackendService){
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
        label: 'Presentation attacks',
        icon: 'pi pi-fw pi-ban',
        routerLink: ['/main/intruders']
      },
      {
        label: 'Password',
        icon: 'pi pi-fw pi-lock',
        routerLink: ['/main/password']
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        command: ()=> {

          let refreshToken = sessionStorage.getItem('refreshToken') || ""

          if(refreshToken == "") {

            this.router.navigateByUrl("")

          }

          this.backend.logOut(refreshToken).subscribe(response => {

            if(response.message == "Logged out"){

              sessionStorage.clear();

              this.router.navigateByUrl("")

            }

          })


        }
      }
    ];

  }

  toggleSideBar(){

    this.sidebarVisible = !this.sidebarVisible;

    console.log(this.sidebarVisible)

  }
}
