import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Question} from "../../interfaces/Question";
import {Result} from "../../interfaces/Result";
import {PdfMakeWrapper, Txt} from "pdfmake-wrapper";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
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
  questions: Question[];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.questions = this.router.getCurrentNavigation()?.extras?.state?.['formData'];
  }

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
  showResult() {
    // Implement your logic to mark incorrect answers and calculate score and percentage
  }
  downloadResult() {
    // Generate PDF from the result data
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);

    pdf.add(
        new Txt(`Result ID: ${1}`)
            .bold()
            .fontSize(14)
            .margin([0, 0, 0, 10])
            .alignment('center')
            .end
    );
    pdf.add(new Txt(`Score: ${this.score}`).fontSize(12).margin([0, 0, 0, 5]).end);
    pdf.add(new Txt(`Percentage: ${this.percentage}%`).fontSize(12).margin([0, 0, 0, 10]).end);
    pdf.add(new Txt('Questions and Answers:').bold().fontSize(12).margin([0, 0, 0, 10]).end);

    this.questions.forEach((question, index) => {
      pdf.add(new Txt(`${index + 1}. ${question.question}`).bold().fontSize(12).margin([0, 0, 0, 5]).end);
      pdf.add(new Txt(`Options: ${question.options.join(', ')}`).fontSize(12).margin([0, 0, 0, 5]).end);
      pdf.add(new Txt(`Answer: ${question.answer}`).fontSize(12).margin([0, 0, 0, 10]).end);
    });

    pdf.create().download(`Result_${new Date()}`);
  }
}
