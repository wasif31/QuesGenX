import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  languages: string[] = ["English", "Spanish", "French"];

  selectedLanguage: string;

  constructor(private router: Router) {}

  startExam() {
    // Navigate to the exam component and pass the selected language as a query parameter
    this.router.navigate(["/exam"], {
      queryParams: { lang: this.selectedLanguage },
    });
  }
}