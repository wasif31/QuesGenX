import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { FeatureRoutingModule } from "./feature-routing.module";
import { UserPageComponent } from "./components/user-page/user-page.component";
import { HomeComponent } from "./components/home/home.component";
import { ResultComponent } from "./components/result/result.component";
import { ExamComponent } from "./components/exam/exam.component";
import { SpeakingExamComponent } from './components/speaking-exam/speaking-exam.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  imports: [CommonModule, FeatureRoutingModule, SharedModule],
  declarations: [
    UserPageComponent,
    UserListComponent,
    HomeComponent,
    ResultComponent,
    ExamComponent,
    SpeakingExamComponent,
    TimerComponent,
  ],
  exports: [HomeComponent],
})
export class FeatureModule {}
