import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VideoService} from "../../services/video.service";
import {Question} from "../../interfaces/Question";
import {ExamSettings} from "../../interfaces/ExamSettings";
import {ResultService} from "../../services/result.service";
import {Router} from "@angular/router";
import {ExamSettingsService} from "../../services/exam-settings.service";
import {ExamService} from "../../services/exam.service";

@Component({
  selector: 'app-lisening-exam',
  templateUrl: './lisening-exam.component.html',
  styleUrls: ['./lisening-exam.component.css']
})
export class LiseningExamComponent implements OnInit {
  videoUrl: string;
  isTimeExpired = false;
  questions: Question[] = [];
  selectedAnswers: { [key: number]: string } = {};
  score: number;
  percentage: number;
  settings: ExamSettings;
  private fileData: string;
  constructor(private videoService: VideoService,
              private http: HttpClient,
              private resultService: ResultService,
              private router:Router,
              private examSettingsService: ExamSettingsService,
              private examService: ExamService
              ) {
  }

  ngOnInit() {
    //this is the uploaded video id
    const videoId = '9834996f40c44b3ba5f13ee7e550640a'
    //get dynamically uploaded video and save it currently for CORS purposes we are not directly call heygenURL, otherwise this code is working
    //
    //this.videoUrl = this.videoService.getVideoStatus(videoId);
    this.videoUrl = './assets/videos/first_video.mp4';

    //console.log("response",response)
    //generate and uplaod video buy uncommenting the bellow code
    //this.videoService.generateVideoRequest();
    this.fetchQuestions();

  }
  handleTimeExpired() {
    // Perform actions when the timer reaches zero
    // For example, disable a button or show a message
    console.log('Time has run out!');
    this.isTimeExpired = true;
  }
  submitExam() {
    this.score = this.resultService.calculateScore(
        this.questions,
        this.selectedAnswers
    );
    this.percentage = (this.score / this.questions.length) * 100;

    // Navigate to the result page with the score and percentage as query parameters
    this.router.navigate(["/result"], {
      queryParams: { score: this.score, percentage: this.percentage },
    });
  }
  fetchQuestions(): void {
    this.settings = this.examSettingsService.getSettings();
    this.fileData = this.videoService.getText();
        this.examService
            .fetchQuestionByText(
                this.settings.selectedExamType,
                this.settings.selectedDifficulty,
                "MCQ",
                this.settings.selectedLanguage,
                this.fileData
            )
            .subscribe((questions) => {
              this.questions = questions;
              console.log(questions);
            });
  }

}
