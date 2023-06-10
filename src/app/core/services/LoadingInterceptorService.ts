import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { LoadingIndicatorService } from "./LoadingIndicatorService";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.loadingIndicatorService.onStarted(req);

    return (
      next
        .handle(req)
        // emit onFinished event after request execution
        .pipe(
          finalize(() => {
            setTimeout(() => this.killTime(), 1000);
            this.loadingIndicatorService.onFinished(req);
          })
        )
    );
  }

  killTime() {}
}
