import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ColorHues} from "./colors.utils";
import {BehaviorSubject, debounceTime, Observable, Subject} from "rxjs";

export interface Colors {
  primary?: Partial<ColorHues>,
  secondary?: Partial<ColorHues>,
  neutral?: Partial<ColorHues>,
  darkMode?: 'media' | '[selector, htmlnever]' | '[selector, html]'
}

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  http = inject(HttpClient);

  queueToSave = new Subject<boolean>();

  colors = new BehaviorSubject<Colors>({
    primary: {
    },
    secondary: {
    },
    neutral: {
    },
    darkMode: 'media'
  });

  constructor() {
    this.queueToSave.pipe(debounceTime(1000)).subscribe(() => {
      this.http.post('/api/set-colors', this.colors.getValue()).subscribe(res => {})
    });
  }

  getColors(): Observable<Colors> {
    this.http.get<Colors>('/api/get-colors').subscribe(res => {
      this.colors.next(res)
    })

    return this.colors.asObservable();
  }

  setColor(colors: ColorHues, type: 'primary' | 'secondary' | 'neutral') {
    const colorToUpdate = structuredClone(this.colors.getValue());
    colorToUpdate[type] = colors;
    this.colors.next(colorToUpdate);
    this.queueToSave.next(true);
  }

  setDarkMode(darkMode: string) {
    if (darkMode === 'media' || darkMode ===  '[selector, htmlnever]' || darkMode ===  '[selector, html]') {
      const colorToUpdate = structuredClone(this.colors.getValue());
      colorToUpdate.darkMode = darkMode;
      this.colors.next(colorToUpdate);
      this.queueToSave.next(true);
    }
  }
}
