import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./shared/layout/layout.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./feature/feature.module").then((mod) => mod.FeatureModule),
  },

  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
