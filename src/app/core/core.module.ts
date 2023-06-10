import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MediaMatcher } from "@angular/cdk/layout";
import { NGXLogger } from "ngx-logger";
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LoaderComponent],
  providers: [MediaMatcher, { provide: NGXLogger, useClass: NGXLogger }],
  exports: [LoaderComponent],
})
export class CoreModule {
  constructor() {}
}
