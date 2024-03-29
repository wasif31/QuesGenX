import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { FeatureRoutingModule } from "./feature-routing.module";
import { UserPageComponent } from "./components/user-page/user-page.component";
import { HomeComponent } from "./components/home/home.component";
import { ResultComponent } from "./components/result/result.component";
import { ExamComponent } from "./components/exam/exam.component";
import { SpeakingExamComponent } from "./components/speaking-exam/speaking-exam.component";
import { TimerComponent } from "./components/timer/timer.component";
import { ExamSettingsComponent } from "./components/exam-settings/exam-settings.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ResultListComponent } from "./components/result-list/result-list.component";
import { LiseningExamComponent } from './components/lisening-exam/lisening-exam.component';
import { AdminComponent } from './components/admin/admin.component';
import {TopicCardComponent} from "./components/topic-card/topic-card.component";
import {TopicBasedExamComponent} from "./components/topic-based-exam/topic-based-exam.components";

@NgModule({
  imports: [CommonModule, FeatureRoutingModule, SharedModule,],
  declarations: [
    UserPageComponent,
    UserListComponent,
    HomeComponent,
    ResultComponent,
    ExamComponent,
    SpeakingExamComponent,
    TimerComponent,
    ExamSettingsComponent,
    AboutUsComponent,
    ResultListComponent,
    ContactUsComponent,
    LiseningExamComponent,
    AdminComponent,
    TopicCardComponent,
    TopicBasedExamComponent
  ],
  exports: [HomeComponent],
})
export class FeatureModule {}
