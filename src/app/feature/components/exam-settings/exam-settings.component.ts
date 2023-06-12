import {Component, EventEmitter, Output} from "@angular/core";
import { Question } from "../../interfaces/Question";
import { ExamService } from "../../services/exam.service";
import { Router } from "@angular/router";
import {
  ContentType,
  DifficultyType,
  ExamType,
  QuestionType,
} from "../../types/types";
import {ExamSettingsService} from "../../services/exam-settings.service";
import {ExamSettings} from "../../interfaces/ExamSettings";

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
  @Output() settingsSaved: EventEmitter<any> = new EventEmitter<any>();
  private selectedQuestionNumber: number;
  constructor(private examService: ExamService, private router: Router,private examSettingsService: ExamSettingsService) {}

  startExam() {
    this.onSaveSettings();
    this.router.navigate(["/exam"]);
    // Fetch questions based on selected exam settings
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.examSettingsService.setFileData(this.selectedFile);
  }
  onSaveSettings() {
    const settings:ExamSettings = {
      selectedDifficulty: this.selectedDifficulty,
      selectedInputType: this.selectedInputType,
      selectedQuestionType: this.selectedQuestionType,
      selectedExamType: this.selectedExamType,
      selectedQuestionNumber: this.selectedQuestionNumber
    };
    // Save the settings to the service

    //this.settingsSaved.emit(settings);
    this.examSettingsService.setSettings(settings);
  }
}
