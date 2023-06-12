import {Component, OnInit} from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { Question } from "../../interfaces/Question";
import { Router } from "@angular/router";
import {ExamSettingsService} from "../../services/exam-settings.service";
import {ExamSettings} from "../../interfaces/ExamSettings";

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

  constructor(private examService: ExamService, private router: Router,private examSettingsService: ExamSettingsService) {
    //todo ashik bhai get the necessary data with question or other items
  }

  submitExam() {
    this.score = this.examService.calculateScore(
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
    this.examService
                      .fetchQuestions2(
                        this.settings.selectedExamType,
                        this.settings.selectedDifficulty,
                        this.settings.selectedQuestionType,
                        this.fileData
                      )
                      .subscribe((questions) => {
                        this.questions = questions;
                        console.log(questions);
                      });
  }
}
