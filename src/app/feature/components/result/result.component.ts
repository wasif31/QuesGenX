import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExamService } from "../../services/exam.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  score: number;
  percentage: number;
  evaluation: string;
  sanitizedHtml: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Retrieve the query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.score = params.score;
      this.percentage = params.percentage;
      this.evaluation = params.evaluation;
    });
    if (this.evaluation){
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.evaluation);
    }
  }
}
