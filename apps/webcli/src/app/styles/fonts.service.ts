import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, debounceTime, Observable, Subject, switchMap} from "rxjs";

export interface Fonts {
  titleRegular?: string;
  titleBold?: string
  titleItalic?: string;
  mainRegular?: string;
  mainBold?: string;
  mainItalic?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  http = inject(HttpClient);

  queueToSave = new Subject<boolean>();

  fonts = new BehaviorSubject<{fontsCss: Fonts, fontsAviable: string[]}>({
    fontsCss: {},
    fontsAviable: []
  });

  constructor() {
    this.queueToSave.pipe(debounceTime(1000)).subscribe(() => {
      this.updateFonts$(this.fonts.getValue().fontsCss).subscribe();
    });
  }

  updateFonts$(fonts: Fonts) {
    return this.http.post('/api/set-fonts', fonts);
  }

  getFonts(): Observable<{fontsCss: Fonts, fontsAviable: string[]}> {
    this.http.get<{fontsCss: Fonts, fontsAviable: string[]}>('/api/get-fonts').subscribe(res => {
      this.fonts.next(res);
    })

    return this.fonts.asObservable();
  }

  deleteFont(font: string) {
    const fontsCss = structuredClone(this.fonts.getValue().fontsCss);
    const fontsAviable = structuredClone(this.fonts.getValue().fontsAviable);

    if (fontsCss.titleRegular === font) {
      fontsCss.titleRegular = '';
    }
    if (fontsCss.titleBold === font) {
      fontsCss.titleBold = '';
    }
    if (fontsCss.titleItalic === font) {
      fontsCss.titleItalic = '';
    }

    if (fontsCss.mainRegular === font) {
      fontsCss.mainRegular = '';
    }
    if (fontsCss.mainBold === font) {
      fontsCss.mainBold = '';
    }
    if (fontsCss.mainItalic === font) {
      fontsCss.mainItalic = '';
    }

    this.updateFonts$(fontsCss).pipe(
      switchMap(res => {
        return this.http.post('/api/delete-font', {font});
      })).subscribe({
        next: (response) => {
          console.log('Delete successful:', response);
          this.getFonts();
        },
        error: (error) => {
          console.error('Delete failed:', error);
          this.getFonts();
        }
      });
  }

  updateFonts(fonts: Fonts) {
    this.fonts.next({
      fontsCss: fonts,
      fontsAviable: structuredClone(this.fonts.getValue().fontsAviable)
    });
    this.queueToSave.next(true);
  }

  uploadFiles(files: File[]) {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.post('/api/upload-fonts', formData).subscribe(() => {
      this.getFonts();
    });
  }
}
