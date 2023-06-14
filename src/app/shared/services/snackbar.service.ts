import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Success', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
  }
}
