import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoggerLevel } from 'ngx-logger';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import {RouterModule} from "@angular/router";
import {AppConfigService} from "./services/app-config.service";
import {HttpInterceptorService} from "./services/http-interceptor.service";
import {ErrorHandlerService} from "./services/error-handler.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.load();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
      RouterModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `api/logs`,
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  providers:[
      { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppConfigService], multi: true},
    { provide: HTTP_INTERCEPTORS,    useClass: HttpInterceptorService,    multi: true  },
    { provide: ErrorHandler, useClass:ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
