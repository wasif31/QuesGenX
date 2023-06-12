import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ExamService } from "../../services/exam.service";
import { Result } from "../../interfaces/Result";

@Component({
  selector: "app-result-list",
  templateUrl: "./result-list.component.html",
  styleUrls: ["./result-list.component.css"],
})
export class ResultListComponent implements OnInit {
  displayedColumns: string[] = ["id", "score", "percentage", "download"];
  dataSource: MatTableDataSource<Result>;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    // Fetch the list of results from the service
    const results: Result[] = this.examService.getResults();
    this.dataSource = new MatTableDataSource<Result>(results);
  }

  downloadResult(result: Result) {
    // Generate PDF from the result data
    // Download the PDF
  }
}
