import { Component } from "@angular/core";
import { Question } from "../../interfaces/Question";
import { ExamService } from "../../services/exam.service";
import { Router } from "@angular/router";
import {
  ContentType,
  DifficultyType,
  ExamType,
  QuestionType,
} from "../../types/types";

@Component({
  selector: "app-exam-settings",
  templateUrl: "./exam-settings.component.html",
  styleUrls: ["./exam-settings.component.css"],
})
export class ExamSettingsComponent {
  examTypes: ExamType[] = ["Reading", "Writing", "Listening", "Speaking"];
  difficultyLevels: DifficultyType[] = ["Easy", "Medium", "Hard"];
  questionTypes: QuestionType[] = ["MCQ", "Fill in the Blanks"];
  inputTypes: ContentType[] = ["PDF", "Image", "Text"];
  selectedExamType: ExamType;
  selectedDifficulty: DifficultyType;
  selectedQuestionType: QuestionType;
  selectedInputType: ContentType;
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
