import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ResultComponent } from "./components/result/result.component";
import { ExamComponent } from "./components/exam/exam.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "exam", component: ExamComponent },
  { path: "result", component: ResultComponent },

  /*{
              path: '',
              component: LayoutComponent,
              children: [
                {
                  path: '',
                  component: UserPageComponent,
                  children: [{ path: '', component: UserListComponent }],
                },
              ],
            },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}