import { Component } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { Question } from "../../interfaces/Question";
import { Router } from "@angular/router";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"],
})
export class ExamComponent {
  selectedExamType: string;
  selectedQuestionType: string;

  questions: Question[] = [];
  selectedAnswers: { [key: number]: string } = {};

  score: number;
  percentage: number;

  constructor(private examService: ExamService, private router: Router) {
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
}
