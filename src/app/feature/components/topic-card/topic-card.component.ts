import {Component, EventEmitter, Output} from '@angular/core';
import {Question} from "../../interfaces/Question";
import {ExamSettings} from "../../interfaces/ExamSettings";
import {ExamService} from "../../services/exam.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamSettingsService} from "../../services/exam-settings.service";
import {ResultService} from "../../services/result.service";
import {ContentType, DifficultyType, ExamType, QuestionType} from "../../types/types";

@Component({
    selector: 'app-topic-card',
    templateUrl: './topic-card.component.html',
    styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent {
    cardItems = [
        { title: 'Football', /* other properties */ },
        { title: 'Cricket', /* other properties */ },
        { title: 'BCS', /* other properties */ }
        // ... more card items
    ];

    questions: Question[] = [];
    @Output() settingsSaved: EventEmitter<any> = new EventEmitter<any>();
    selectedQuestionNumber: number;
    private selectedLang: string;
    private selectedCardName: string;

    constructor(
        private examService: ExamService,
        private router: Router,
        private examSettingsService: ExamSettingsService,
        private route: ActivatedRoute
    ) {}

    startExam(cardItem) {
        // this.onSaveSettings();
        this.router.navigate(["/topic-based-exam"], {state:{selectedCardName: cardItem.title}});
        // Fetch questions based on selected exam settings
    }

    ngOnInit(): void {
        const params = this.route.snapshot.queryParams;
        this.selectedLang = params['lang'];
    }
}
