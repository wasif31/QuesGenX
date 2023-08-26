import {Component, EventEmitter, Output} from '@angular/core';
import {Question} from "../../interfaces/Question";
import {ExamService} from "../../services/exam.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamSettingsService} from "../../services/exam-settings.service";
import {CardTopicModel} from "../../interfaces/CardTopicModel";

@Component({
    selector: 'app-topic-card',
    templateUrl: './topic-card.component.html',
    styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent {
    cardItems:CardTopicModel[] = [
        {
            title: 'BrainStation 23',
            description: '',
            image:'card-bs'
        },
        {
            title: 'Football',
            description: '',
            image:'card--1'
        },
        {
            title: 'Cricket',
            description: '',
            image:'card--2'
        },
        {
            title: 'BCS',
            description: '',
            image:'card-bcs'
        },
        {
            title: 'Game of Thrones',
            description: '',
            image:'card-got'
        },
        {
            title: 'Thanos',
            description: '',
            image:'card-thanos'
        },
        {
            title: 'Asp.Net Core',
            description: '',
            image:'card-dotnet'
        },
        {
            title: 'Angular',
            description: '',
            image:'card-angular'
        },
        {
            title: 'Python',
            description: '',
            image:'card-python'

        },
        {
            title: 'Programming',
            description: '',
            image:'card-programming'
        },
        {
            title: 'Doraemon',
            description: '',
            image:'card-doreamon'
        },
        {
            title: 'Tom and Jerry',
            description: '',
            image:'card-tom'
        },
        {
            title: 'Time Complexity',
            description: '',
            image:''
        },
        {
            title: 'Calculus',
            description: '',
            image:'card-calculus'
        },
        {
            title: 'Relationship',
            description: '',
            image:''
        },
        {
            title: 'IQ Test',
            description: '',
            image:''
        },
        {
            title: 'Barbie',
            description: '',
            image:''
        },
        {
            title: 'Silly Riddles',
            description: '',
            image:''
        },
        {
            title: 'Hero Alam',
            description: '',
            image:''
        },
        {
            title: 'Shakib Al Hasan',
            description: '',
            image:'card-sakib'
        },
        {
            title: 'NopCommerce',
            description: '',
            image:''
        },
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
