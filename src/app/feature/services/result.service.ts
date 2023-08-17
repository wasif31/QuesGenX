import { Injectable } from '@angular/core';
import {Question} from "../interfaces/Question";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {Result} from "../interfaces/Result";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient,private snackbarService: SnackbarService) { }
  calculateScore(
      questions: Question[],
      selectedAnswers: { [key: number]: string }
  ): number {
    let score = 0;

    questions.forEach((question:Question) => {
      const userResponse = selectedAnswers[question.id];
      question.selectedAnswer = userResponse;
      question.selectedOption = question.id;
      if (userResponse === question.answer) {
        question.isCorrect = true
        score++;
      }
    });

    return score;
  }
  fetchResults(
      userId: number,
  ): Observable<Result[]> {

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    const queryParams = new HttpParams().set("userId", userId);
    //return this.http.get<any>("http://127.0.0.1:8000/")

    return this.http.get<any>(
        "http://127.0.0.1:8000/api/exam/getResults/",
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
}
