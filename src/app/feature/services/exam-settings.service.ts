import { Injectable } from '@angular/core';
import {ExamSettings} from "../interfaces/ExamSettings";

@Injectable({
  providedIn: 'root'
})
export class ExamSettingsService {
  public settings: ExamSettings;
  public fileData: any;
  constructor() { }
  setSettings(settings: ExamSettings) {
    this.settings = settings;
  }

  getSettings():ExamSettings {
    return this.settings;
  }

  setFileData(fileData: any) {
    this.fileData = fileData;

  }

  getFileData() {
    return this.fileData;
  }
}
