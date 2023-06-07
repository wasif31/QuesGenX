import { Component } from "@angular/core";
import { Question } from "../../interfaces/Question";
import { ExamService } from "../../services/exam.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-exam-settings",
  templateUrl: "./exam-settings.component.html",
  styleUrls: ["./exam-settings.component.css"],
})
export class ExamSettingsComponent {
  examTypes: string[] = ["Reading", "Writing", "Listening", "Speaking"];
  difficultyLevels: string[] = ["Easy", "Medium", "Hard"];
  questionTypes: string[] = ["MCQ", "Fill in the Blanks"];
  inputTypes: string[] = ["PDF", "Images", "Text"];
  selectedExamType: string;
  selectedDifficulty: string;
  selectedQuestionType: string;
  selectedInputType: string;
  selectedFile: File | null;
  questions: Question[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  startExam() {
    //todo ashik bhai make a post request with this
    this.router.navigate(["/exam"]);
    // Fetch questions based on selected exam settings
    /*this.examService
              .fetchQuestions2(
                this.selectedExamType,
                this.selectedDifficulty,
                this.selectedQuestionType,
                this.selectedFile
              )
              .subscribe((questions) => {
                this.questions = questions;
                console.log(questions);
              });*/
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
