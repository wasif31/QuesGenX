import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  score: number;
  percentage: number;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit() {
    // Retrieve the query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.score = params.score;
      this.percentage = params.percentage;

      // this.examService
      //   .fetchQuestions(examType, difficulty, questionType)
      //   .subscribe((questions) => {
      //     // Calculate the score and percentage based on user responses
      //     this.score = this.examService.calculateScore(questions);
      //     this.percentage = (this.score / questions.length) * 100;
      //   });
    });
  }
}
