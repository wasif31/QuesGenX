import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"],
})
export class ExamComponent {
  examTypes: string[] = ["Reading", "Writing", "Listening"];
  difficultyLevels: string[] = ["Easy", "Medium", "Hard"];
  questionTypes: string[] = ["MCQ", "Fill in the Blanks"];
  selectedExamType: string;
  selectedDifficulty: string;
  selectedQuestionType: string;

  constructor(private router: Router) {}

  startExam() {
    // Pass the selected exam settings as query parameters
    this.router.navigate(["/result"], {
      queryParams: {
        examType: this.selectedExamType,
        difficulty: this.selectedDifficulty,
        questionType: this.selectedQuestionType,
      },
    });
  }
}
