import { Injectable } from "@angular/core";
import {catchError, Observable, of} from "rxjs";
import { Question } from "../interfaces/Question";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppConfigService } from "../../services/app-config.service";
import { Result } from "../interfaces/Result";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  protected apiServer = AppConfigService.settings.apiServer;
  private results: Result[] = [
    {
      id: 1,
      score: 80,
      percentage: 80,
      questions: [
        {
          question: "What is the capital of France?",
          answer: "Paris",
          id: 2,
          options: ["Paris", "Moscow", "Dhaka", "Mumbai"],
        },
        {
          id: 1,
          question: "Who painted the Mona Lisa?",
          options: [],
          answer: "Leonardo da Vinci",
        },
      ],
    },
    {
      id: 2,
      score: 70,
      percentage: 70,
      questions: [
        {
          question: "What is the largest planet in our solar system?",
          answer: "Jupiter",
          id: 3,
          options: [],
        },
        {
          question: 'Who wrote the play "Romeo and Juliet"?',
          answer: "William Shakespeare",
          id: 4,
          options: [],
        },
      ],
    },
  ];

  constructor(private http: HttpClient,private snackbarService: SnackbarService) {
    console.log(this.apiServer.apiUrl);
  }

  getResults(): Result[] {
    return this.results;
  }

  fetchQuestions2(
    examType: string,
    difficulty: string,
    questionType: string,
    selectedFile: File
  ): Observable<Question[]> {
    //var questions = this.http.post<any>("http://127.0.0.1:8000/summarize/?no_of_quest=3", selectedFile)

    const formData = new FormData();
    formData.append("file", selectedFile);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    const queryParams = new HttpParams().set("no_of_quest", 3);
    //return this.http.get<any>("http://127.0.0.1:8000/")

    return this.http.post<any>(
      "http://127.0.0.1:8000/api/exam/generateQuestionFromPDF/",
      formData,
      { params: queryParams }
    ).pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          this.snackbarService.showError('An error occurred! '+error.message);
          // Handle the error as needed, e.g., show an error message
          return of([]); // Return an empty array or appropriate default value
        })
    );

    //return of(questions);
  }

  fetchQuestionByText(
    examType: string,
    difficulty: string,
    questionType: string,
    selectedText: string
  ): Observable<Question[]> {
    //var questions = this.http.post<any>("http://127.0.0.1:8000/summarize/?no_of_quest=3", selectedFile)


    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    const queryParams = new HttpParams().set("no_of_quest", 5);
    //return this.http.get<any>("http://127.0.0.1:8000/")

    return this.http.post<any>(
      "http://127.0.0.1:8000/api/exam/generateQuestionFromText/",
      { params: queryParams, body: selectedText }
    ).pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          this.snackbarService.showError('An error occurred! '+error.message);
          // Handle the error as needed, e.g., show an error message
          return of([]); // Return an empty array or appropriate default value
        })
    );

    //return of(questions);
  }

  getSpeakingResponse(
    examType: string,
    difficulty: string,
    questionType: string,
    selectedLanguage: string,
    selectedFile: File
  ): Observable<string> {
    //var questions = this.http.post<any>("http://127.0.0.1:8000/summarize/?no_of_quest=3", selectedFile)

    const formData = new FormData();
    formData.append("file", selectedFile);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    const queryParams = new HttpParams()
        .set("no_of_quest", 5)
        .set("examType", examType)
        .set("difficulty", difficulty)
        .set("questionType", questionType)
        .set("selectedLanguage", selectedLanguage)
    ;
    //return this.http.get<any>("http://127.0.0.1:8000/")

    return this.http.post<any>(
      "http://127.0.0.1:8000/api/exam/evaluateSpeech/",
      formData,
      { params: queryParams }
    ).pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          this.snackbarService.showError('An error occurred! '+error.message);
          // Handle the error as needed, e.g., show an error message
          return of([]); // Return an empty array or appropriate default value
        })
    );
  }

}
