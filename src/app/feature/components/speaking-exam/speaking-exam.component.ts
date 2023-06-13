import { Component, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AudioRecordingService } from "../../services/audio-recording.service";
import { ExamService } from "../../services/exam.service";
import { ExamSettingsService } from "../../services/exam-settings.service";
import { ExamSettings } from "../../interfaces/ExamSettings";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: "app-speaking-exam",
  templateUrl: "./speaking-exam.component.html",
  styleUrls: ["./speaking-exam.component.css"],
})
export class SpeakingExamComponent implements OnDestroy {
  isRecording = false;
  recordedTime;
  blobUrl;
  teste;
  response: string;
  private settings: ExamSettings;

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private examService: ExamService,
    private examSettingsService: ExamSettingsService,
    private router: Router
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }

  submitExam() {
    const blob = this.teste.blob;
    const title = this.teste.title;

    // Convert the Blob to a File
    const file = new File([blob], title, { type: "audio/wav" });
    this.settings = this.examSettingsService.getSettings();
    this.examService
      .getSpeakingResponse(
        this.settings.selectedExamType,
        this.settings.selectedDifficulty,
        this.settings.selectedQuestionType,
        file
      )
      .subscribe((response) => {
        this.response = response;
        console.log(response);
        if (this.response) {
          this.router.navigate(["/result"], {
            queryParams: { evaluation: this.response },
          });
        }
      });
  }
}
