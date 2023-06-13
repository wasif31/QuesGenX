import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }
  getVideoStatus(videoId: string):any{
    const apiUrl = `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`;
    const apiKey = this.getApiKey();

    const headers = new HttpHeaders({
      'X-Api-Key': apiKey
    });

    this.http.get(apiUrl, { headers })
        .subscribe(
            (response:any) => {
              console.log('API response:', response);
              const data = response;
              if(response&&response.data.status=='completed'&&response.data.video_url){
                //this.downloadFile(response.data.video_url,headers);
                return response.data.video_url;
              }
            },
            (error) => {
              console.error('API error:', error);
              // Handle errors
            }
        );
  }

  downloadFile(downloadUrl: string, headers: HttpHeaders): void {
    this.http.get(downloadUrl, { responseType: 'blob',headers:headers })
        .subscribe(
            (response) => {
              const fileUrl = URL.createObjectURL(response);
              this.saveFile(fileUrl);
            },
            (error) => {
              console.error('API error:', error);
              // Handle errors
            }
        );
  }
  saveFile(fileUrl: string): void {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'first_video.mp4';
    link.click();
  }
  makeApiRequest(): void {
    const apiUrl = 'https://api.heygen.com/v1/video.generate';
    const apiKey = this.getApiKey();

    const headers = new HttpHeaders({
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      background: '#ffffff',
      clips: [
        {
          avatar_id: 'Daisy-inskirt-20220818',
          avatar_style: 'normal',
          input_text: 'Cristiano Ronaldo, born on February 5, 1985, is a Portuguese professional footballer widely regarded as one of the greatest players of all time. He has achieved remarkable success throughout his career, playing for top clubs like Sporting CP, Manchester United, Real Madrid, and Juventus.\n' +
              '\n' +
              'Known for his exceptional athleticism, speed, and goal-scoring ability, Ronaldo has won numerous individual awards, including multiple FIFA Ballon d\'Or titles. He has consistently displayed his remarkable skills, both with his feet and in the air, and has showcased his versatility by playing as a forward or winger.',
          offset: {
            x: 0,
            y: 0
          },
          scale: 1,
          voice_id: '1bd001e7e50f421d891986aad5158bc8'
        }
      ],
      ratio: '16:9',
      test: true,
      version: 'v1alpha'
    };

    this.http.post(apiUrl, requestBody, { headers })
        .subscribe(
            (response) => {
              console.log('API response:', response);
              // Handle the response as needed
            },
            (error) => {
              console.error('API error:', error);
              // Handle errors
            }
        );
  }
  getApiKey(): string {
    // return "Your Api Key";
    return "OWMyOWQ4ZjhjODAwNGFiYmI0MDAyMTI4NDVjMzA5ZGUtMTY4NjY0MTU1Mw==";
  }
}
