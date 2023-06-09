import { Component } from '@angular/core';
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  enteredText:string;
  constructor(private videoService: VideoService) {
  }

  generateVideo() {
    this.videoService.generateVideoRequest(this.enteredText);

  }
}
