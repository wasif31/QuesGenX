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
            title: 'Football',
            description: 'Are you a Football Lover?',
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
            image:'card--3'
        },
        {
            title: 'Dhaka',
            description: '',
            image:''
        },
        {
            title: 'BrainStation 23',
            description: '',
            image:''
        },
        {
            title: 'NopCommerce',
            description: '',
            image:''
        },
        {
            title: 'Game of Thrones',
            description: '',
            image:''
        },
        {
            title: 'Thanos',
            description: '',
            image:''
        },
        {
            title: 'Asp.Net Core',
            description: '',
            image:''
        },
        {
            title: 'Angular',
            description: '',
            image:''
        },
        {
            title: 'Python',
            description: '',
            image:''

        },
        {
            title: 'Competitive Programming',
            description: '',
            image:''
        },
        {
            title: 'Doraemon',
            description: '',
            image:''
        },
        {
            title: 'Tom and Jerry',
            description: '',
            image:''
        },
        {
            title: 'Time Complexity',
            description: '',
            image:''
        },
        {
            title: 'Calculus',
            description: '',
            image:''
        },
        {
            title: 'Relationship',
            description: '',
            image:''
        },
        {
            title: 'Bangladeshi Rumor',
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
            title: 'BTS Army',
            description: '',
            image:''
        },
        {
            title: 'Silly Riddles',
            description: '',
            image:''
        },
        {
            title: 'Comedic Science',
            description: '',
            image:''
        },
        {
            title: 'Behavioral Question',
            description: '',
            image:''

        },
        {
            title: 'Hero Alam',
            description: '',
            image:''
        },
        {
            title: 'Porimoni',
            description: '',
            image:''
        },
        {
            title: 'Shakib Al Hasan',
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
