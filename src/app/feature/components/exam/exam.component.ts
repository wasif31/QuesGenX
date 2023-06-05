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
  examTypes: string[] = ["Reading", "Writing", "Listening","Speaking"];
  difficultyLevels: string[] = ["Easy", "Medium", "Hard"];
  questionTypes: string[] = ["MCQ", "Fill in the Blanks"];

  selectedExamType: string;
  selectedDifficulty: string;
  selectedQuestionType: string;
  selectedFile: File | null;

  questions: Question[] = [];
  selectedAnswers: { [key: number]: string } = {};

  examSubmitted = false;
  score: number;
  percentage: number;

  constructor(private examService: ExamService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  startExam() {
    // Fetch questions based on selected exam settings
    this.examService
      .fetchQuestions2(
        this.selectedExamType,
        this.selectedDifficulty,
        this.selectedQuestionType,
        this.selectedFile
      )
      .subscribe((questions) => {
        this.questions = questions;
        console.log(questions);
      });
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
