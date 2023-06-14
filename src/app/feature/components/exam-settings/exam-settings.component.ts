import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import { Question } from "../../interfaces/Question";
import { ExamService } from "../../services/exam.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ContentType,
  DifficultyType,
  ExamType,
  QuestionType,
} from "../../types/types";
import { ExamSettingsService } from "../../services/exam-settings.service";
import { ExamSettings } from "../../interfaces/ExamSettings";

@Component({
  selector: "app-exam-settings",
  templateUrl: "./exam-settings.component.html",
  styleUrls: ["./exam-settings.component.css"],
})
export class ExamSettingsComponent implements OnInit {
  examTypes: ExamType[] = ["Writing", "Listening", "Speaking"]; //todo "Reading"
  difficultyLevels: DifficultyType[] = ["Easy", "Medium", "Hard"];
  questionTypes: QuestionType[] = ["MCQ", "Fill in the Blanks"];
  inputTypes: ContentType[] = ["PDF", "Text"];
  selectedExamType: ExamType;
  selectedDifficulty: DifficultyType;
  selectedQuestionType: QuestionType;
  selectedInputType: ContentType;
  selectedFile: File | null;
  questions: Question[] = [];
  @Output() settingsSaved: EventEmitter<any> = new EventEmitter<any>();
  private selectedQuestionNumber: number;
  private selectedLang: string;
  enteredText: string;

  constructor(
    private examService: ExamService,
    private router: Router,
    private examSettingsService: ExamSettingsService,
    private route: ActivatedRoute
  ) {}

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
    const settings: ExamSettings = {
      selectedDifficulty: this.selectedDifficulty,
      selectedInputType: this.selectedInputType,
      selectedQuestionType: this.selectedQuestionType,
      selectedExamType: this.selectedExamType,
      selectedQuestionNumber: this.selectedQuestionNumber,
      selectedLanguage: this.selectedLang,

    };
    // Save the settings to the service

    //this.settingsSaved.emit(settings);
    this.examSettingsService.setSettings(settings);
    if(this.enteredText){
      this.examSettingsService.setFileData(this.enteredText);
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.selectedLang = params['lang'];
  }
}
