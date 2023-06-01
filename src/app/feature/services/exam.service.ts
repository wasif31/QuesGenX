import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Question } from "../interfaces/Question";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor() {}

  fetchQuestions(
    examType: string,
    difficulty: string,
    questionType: string
  ): Observable<Question[]> {
    // Dummy data - replace with your actual data retrieval logic
    const questions: Question[] = [
      {
        id: 1,
        text: "Question 1",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: "Option 2",
      },
      {
        id: 2,
        text: "Question 2",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: "Option 3",
      },
      {
        id: 3,
        text: "Question 3",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: "Option 1",
      },
      {
        id: 4,
        text: "Question 4",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: "Option 4",
      },
      {
        id: 5,
        text: "Question 5",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: "Option 2",
      },
    ];

    return of(questions);
  }

  calculateScore(questions: Question[]): number {
    let score = 0;

    questions.forEach((question) => {
      const userResponse = "Option 2";

      if (userResponse === question.answer) {
        score++;
      }
    });

    return score;
  }
}
