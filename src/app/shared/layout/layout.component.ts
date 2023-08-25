import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { LoadingIndicatorService } from "../../core/services/LoadingIndicatorService";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  loading: boolean = false;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change',this._mobileQueryListener);
    loadingIndicatorService.onLoadingChanged.subscribe(
      (isLoading) => (this.loading = isLoading)
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change',this._mobileQueryListener);
  }
}
