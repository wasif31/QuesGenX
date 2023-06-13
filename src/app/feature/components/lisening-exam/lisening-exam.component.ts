import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-lisening-exam',
  templateUrl: './lisening-exam.component.html',
  styleUrls: ['./lisening-exam.component.css']
})
export class LiseningExamComponent implements OnInit {
  videoUrl: string;
  constructor(private videoService: VideoService,private http: HttpClient) {
  }

  ngOnInit() {
    const videoId = '9834996f40c44b3ba5f13ee7e550640a'
    //this.videoUrl = this.videoService.getVideoStatus(videoId);
    this.videoUrl = './assets/videos/first_video.mp4';

    //console.log("response",response)
    //generate your first video
    //this.videoService.makeApiRequest();
  }



}
