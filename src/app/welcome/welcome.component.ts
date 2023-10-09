import { Component } from '@angular/core';
import { Tech } from 'src/Models/Models';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  hardware: Tech[]

  technologies: Tech[]



  responsiveOptions: any[] | undefined;


  constructor(){

    this.hardware = []

    this.technologies = []

  }

  ngOnInit(){

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];

    this.hardware.push( new Tech("Camera Pi 4", "camera.png", "Camera for capturing images."))
    this.hardware.push( new Tech("Raspberry Pi 4", "board.webp", "Microntroller of the project."))
    this.hardware.push( new Tech("WS2812B 24 bits RGB LED ", "ring.png", "Light to iluminate."))
    this.hardware.push( new Tech("HC SR Sensor ", "sensor.webp", "Sensor to turn on camera depending on distance."))
    this.hardware.push( new Tech("1.8 TFT SPI 128x160 display", "display.png","Display to show results."))

    this.technologies.push( new Tech("Raspberry pi OS ", "rpi.png", "OS to controll the Raspberry PI ."))
    this.technologies.push( new Tech("Ultralytics", "ultralytics.png", "Creating object detection models ."))
    this.technologies.push( new Tech("Deepface ", "deepface.png", "Open source project to extract face embeddings from different models."))
    this.technologies.push( new Tech("FastApi ", "fastapi.png", "API Restful server to process images."))
    this.technologies.push( new Tech("Firebase", "firebase.png","Real time database to configure device."))
    this.technologies.push( new Tech("Angular", "angular.png","Framework to build configuration app."))
    this.technologies.push( new Tech("Node JS", "node.png","Restful API to back end the app."))
    this.technologies.push( new Tech("Twilo", "twilo.png","Service for WhatsApp messaging."))



  }

}
