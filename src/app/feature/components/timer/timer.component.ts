import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit {
  @Input() duration: number; // Duration in seconds
  @Output() timeExpired: EventEmitter<void> = new EventEmitter<void>();
  minutes: number;
  seconds: number;
  timer: any;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.minutes = Math.floor(this.duration / 60);
    this.seconds = this.duration % 60;

    this.timer = setInterval(() => {
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
}
