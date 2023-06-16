import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { Question } from "../../interfaces/Question";
import { Router } from "@angular/router";
import { ExamSettingsService } from "../../services/exam-settings.service";
import { ExamSettings } from "../../interfaces/ExamSettings";
import {ResultService} from "../../services/result.service";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"],
})
export class ExamComponent implements OnInit {
  questions: Question[] = [];
  selectedAnswers: { [key: number]: string } = {};
  score: number;
  percentage: number;
  settings: ExamSettings;
  private fileData: any;
  isTimeExpired = false;

  constructor(
    private examService: ExamService,
    private router: Router,
    private examSettingsService: ExamSettingsService,
    private resultService: ResultService,
  ) {
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

  ngOnInit(): void {
    this.settings = this.examSettingsService.getSettings();
    this.fileData = this.examSettingsService.getFileData();
    if (this.settings.selectedExamType == "Writing") {
      if (this.settings.selectedInputType == "Text") {
        this.examService
          .fetchQuestionByText(
            this.settings.selectedExamType,
            this.settings.selectedDifficulty,
            this.settings.selectedQuestionType,
            this.settings.selectedLanguage,
            this.fileData,
              this.settings.selectedQuestionNumber
          )
          .subscribe((questions) => {
            this.questions = questions;
            console.log(questions);
          });
      } else if (this.settings.selectedInputType == "PDF") {
        this.examService
          .fetchQuestions2(
            this.settings.selectedExamType,
            this.settings.selectedDifficulty,
            this.settings.selectedQuestionType,
            this.fileData,
              this.settings.selectedQuestionNumber
          )
          .subscribe((questions) => {
            this.questions = questions;
            console.log(questions);
          });
      }
    }
  }
  handleTimeExpired() {
    // Perform actions when the timer reaches zero
    // For example, disable a button or show a message
    console.log('Time has run out!');
    this.isTimeExpired = true;
  }
}
