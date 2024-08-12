import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, debounceTime, Observable, Subject} from "rxjs";

export type GlobalSettingsValue = 'seokGlobalStyle' | 'seokWebsiteName' | 'seokWebsiteUrl' | 'seokCreationDate' | 'seokContactEmail' | 'seokFavicon' | 'seokLogoUrl' | 'seokLogoWidth' | 'seokLogoHeight';

export interface GlobalSettings {
  seokWebsiteName: string;
  seokWebsiteUrl: string;
  seokCreationDate: string;
  seokContactEmail: string;
  seokFavicon: string;
  seokLogoUrl: string;
  seokLogoWidth: string;
  seokLogoHeight: string;
  seokGlobalStyle: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  http = inject(HttpClient);
  settings = new BehaviorSubject<Partial<GlobalSettings>>({});

  queueToSave = new Subject<boolean>();

  constructor() {
    this.queueToSave.pipe(debounceTime(1000)).subscribe(() => {
      this.http.post('/api/set-settings', this.settings.getValue()).subscribe(res => {})
    });
  }

  getSettings(): Observable<Partial<GlobalSettings>> {
    this.http.get<Partial<GlobalSettings>>('/api/get-settings').subscribe((settings: Partial<GlobalSettings>) => {
      this.settings.next(settings);
    });

    return this.settings.asObservable();
  }

  setSettings(key: GlobalSettingsValue, value: string) {
    const settingsToUpdate = structuredClone(this.settings.getValue());

    settingsToUpdate[key] = value;
    this.settings.next(settingsToUpdate);
    this.queueToSave.next(true);
  }
}
