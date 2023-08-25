import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { Question } from "../../interfaces/Question";
import { Router } from "@angular/router";
import { ExamSettingsService } from "../../services/exam-settings.service";
import { ExamSettings } from "../../interfaces/ExamSettings";
import {ResultService} from "../../services/result.service";

@Component({
    selector: "app-topic-based-exam",
    templateUrl: "./topic-based-exam.components.html",
    styleUrls: ["./topic-based-exam.components.css"],
})
export class TopicBasedExamComponent implements OnInit {
    questions: Question[] = [];
    selectedAnswers: { [key: number]: string } = {};
    score: number;
    percentage: number;
    settings: ExamSettings;
    private fileData: any;
    isTimeExpired = false;

    selectedCardName: "";

    constructor(
        private examService: ExamService,
        private router: Router,
        private examSettingsService: ExamSettingsService,
        private resultService: ResultService,
    ) {
        this.selectedCardName = this.router.getCurrentNavigation()?.extras?.state?.['selectedCardName'];
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
            state:{questions: this.questions}
        });
    }

    ngOnInit(): void {
        this.examService
            .fetchQuestionsBasedOnType(
                this.selectedCardName
            )
            .subscribe((questions) => {
                this.questions = questions;
                console.log(questions);
            });
    }
    handleTimeExpired() {
        // Perform actions when the timer reaches zero
        // For example, disable a button or show a message
        console.log('Time has run out!');
        this.isTimeExpired = true;
    }
}
