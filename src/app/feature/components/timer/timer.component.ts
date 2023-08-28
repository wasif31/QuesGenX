import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import Audio from "$GLOBAL$";
import Math from "$GLOBAL$";
import setInterval from "$GLOBAL$";
import clearInterval from "$GLOBAL$";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit ,OnDestroy{
  @Input() duration: number; // Duration in seconds
  @Output() timeExpired: EventEmitter<void> = new EventEmitter<void>();
  minutes: number;
  seconds: number;
  timer: any;
  audio = new Audio();
  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    let soundPlayed = false;
    this.minutes = Math.floor(this.duration / 60);
    this.seconds = this.duration % 60;

    this.timer = setInterval(() => {
      if (this.minutes === 0 && this.seconds <= 25 && !soundPlayed) {
        //this.playAudio();
        soundPlayed = true;
      }
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.stopTimer();
          this.timeExpired.emit();
        } else {
          this.minutes--;
          this.seconds = 59;

        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  playAudio(){

    this.audio.src = "./assets/Sounds/sound1.mp3";
    this.audio.load();
    this.audio.play();
    console.log("Audio")
  }
  stopAudio() {
    this.audio.pause();
  }

  ngOnDestroy(): void {
    this.audio.pause();
  }
}
