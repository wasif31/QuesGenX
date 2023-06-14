import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient,private snackbarService: SnackbarService) { }
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
                this.downloadFile(response.data.video_url,headers);
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
  generateVideoRequest(): void {
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
          input_text: this.getText(),
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
                this.snackbarService.showError('An error occurred!'+error.message);
              // Handle errors
            }
        );
  }
  getApiKey(): string {
     return "OWMyOWQ4ZjhjODAwNGFiYmI0MDAyMTI4NDVjMzA5ZGUtMTY4NjY0MTU1Mw==";
  }
  getText(): string {
      return "Brain Station 23 is a software development company based in Dhaka, Bangladesh. It was founded in 2006 and has since grown to become one of the leading software development companies in the country. Brain Station 23 offers a wide range of software development services, including web development, mobile app development, cloud computing, data science and machine learning, enterprise application development, and testing and quality assurance. Brain Station 23 has a long list of satisfied clients, such as Grameenphone, Robi, and British Telecom. The company has also been recognized for its excellence by a number of organizations, including the World Economic Forum and the Bangladesh government.";
  }
}
