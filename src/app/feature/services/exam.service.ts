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
        text: "Which country hosted the 2020 Summer Olympics?",
        options: ["Japan", "United States", "Brazil", "China"],
        answer: "Japan",
      },
      {
        id: 2,
        text: "Who is the author of the Harry Potter book series?",
        options: [
          "Stephen King",
          "Dan Brown",
          "J.K. Rowling",
          "George R.R. Martin",
        ],
        answer: "J.K. Rowling",
      },
      {
        id: 3,
        text: "What is the capital city of France?",
        options: ["Paris", "Rome", "Berlin", "London"],
        answer: "Paris",
      },
      {
        id: 4,
        text: "Who painted the Mona Lisa?",
        options: [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Michelangelo",
          "Leonardo da Vinci",
        ],
        answer: "Leonardo da Vinci",
      },
      {
        id: 5,
        text: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Mars",
      },
    ];

    return of(questions);
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
