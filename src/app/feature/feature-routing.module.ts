import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ResultComponent } from "./components/result/result.component";
import { ExamComponent } from "./components/exam/exam.component";
import { ExamSettingsComponent } from "./components/exam-settings/exam-settings.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ResultListComponent } from "./components/result-list/result-list.component";
import {AdminComponent} from "./components/admin/admin.component";
import {TopicCardComponent} from "./components/topic-card/topic-card.component";
import {TopicBasedExamComponent} from "./components/topic-based-exam/topic-based-exam.components";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "exam", component: ExamComponent },
  { path: "settings", component: ExamSettingsComponent },
  { path: "result", component: ResultComponent },
  { path: "results", component: ResultListComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "admin", component: AdminComponent },
  { path: "topic-card", component: TopicCardComponent},
  { path: "topic-based-exam", component: TopicBasedExamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
