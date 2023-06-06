import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;
import * as RecordRTC from 'recordrtc';
import {AudioRecordingService} from "../../services/audio-recording.service";
@Component({
  selector: 'app-speaking-exam',
  templateUrl: './speaking-exam.component.html',
  styleUrls: ['./speaking-exam.component.css']
})
export class SpeakingExamComponent implements OnDestroy{
  isRecording = false;
  recordedTime;
  blobUrl;
  teste;

  constructor(
      private audioRecordingService: AudioRecordingService,
      private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
        .recordingFailed()
        .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
        .getRecordedTime()
        .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
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
}
