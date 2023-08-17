import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ExamService } from "../../services/exam.service";
import { Result } from "../../interfaces/Result";
import {PdfMakeWrapper, Txt} from "pdfmake-wrapper";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {ResultService} from "../../services/result.service";

@Component({
  selector: "app-result-list",
  templateUrl: "./result-list.component.html",
  styleUrls: ["./result-list.component.css"],
})
export class ResultListComponent implements OnInit {
  displayedColumns: string[] = ["id", "score", "percentage", "download"];
  dataSource: MatTableDataSource<Result>;
  results: Result[];
  constructor(private resultService: ResultService,private examService: ExamService) {}

  ngOnInit() {
    // Fetch the list of results from the service
    const userId = 1;
    this.resultService.fetchResults(userId).subscribe((result) => {
      this.results  = result;
      console.log(result);
    });
    this.dataSource = new MatTableDataSource<Result>(this.examService.getResults());
  }

  downloadResult(result: Result) {
    // Generate PDF from the result data
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);

    pdf.add(
        new Txt(`Result ID: ${result.id}`)
            .bold()
            .fontSize(14)
            .margin([0, 0, 0, 10])
            .alignment('center')
            .end
    );
    pdf.add(new Txt(`Score: ${result.score}`).fontSize(12).margin([0, 0, 0, 5]).end);
    pdf.add(new Txt(`Percentage: ${result.percentage}%`).fontSize(12).margin([0, 0, 0, 10]).end);
    pdf.add(new Txt('Questions and Answers:').bold().fontSize(12).margin([0, 0, 0, 10]).end);

    result.questions.forEach((question, index) => {
      pdf.add(new Txt(`${index + 1}. ${question.question}`).bold().fontSize(12).margin([0, 0, 0, 5]).end);
      pdf.add(new Txt(`Options: ${question.options.join(', ')}`).fontSize(12).margin([0, 0, 0, 5]).end);
      pdf.add(new Txt(`Answer: ${question.answer}`).fontSize(12).margin([0, 0, 0, 10]).end);
    });

    pdf.create().download(`Result_${result.id}`);
  }
}
