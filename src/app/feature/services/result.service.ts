import { Injectable } from '@angular/core';
import {Question} from "../interfaces/Question";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }
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
