import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Question } from "../interfaces/Question";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppConfigService } from "../../services/app-config.service";
import { Result } from "../interfaces/Result";

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

  constructor(private http: HttpClient) {
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
      "http://127.0.0.1:8000/api/exam/generateQuestion/",
      formData,
      { params: queryParams }
    );
    // Dummy data - replace with your actual data retrieval logic

    //return of(questions);
  }

  getSpeakingResponse(
    examType: string,
    difficulty: string,
    questionType: string,
    selectedFile: File
  ): Observable<string> {
    //var questions = this.http.post<any>("http://127.0.0.1:8000/summarize/?no_of_quest=3", selectedFile)

    const formData = new FormData();
    formData.append("file", selectedFile);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    const queryParams = new HttpParams().set("no_of_quest", 3);
    //return this.http.get<any>("http://127.0.0.1:8000/")

    return this.http.post<any>(
      "http://127.0.0.1:8000/api/exam/evaluateSpeech/",
      formData,
      { params: queryParams }
    );
    // Dummy data - replace with your actual data retrieval logic

    //return of(questions);
  }

  calculateScore(
    questions: Question[],
    selectedAnswers: { [key: number]: string }
  ): number {
    let score = 0;

    questions.forEach((question) => {
      const userResponse = selectedAnswers[question.id];

      if (userResponse === question.answer) {
        score++;
      }
    });

    return score;
  }
}
