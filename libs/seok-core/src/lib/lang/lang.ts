import {effect, inject, Injectable, signal} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LangService {
  document = inject(DOCUMENT);

  lang = signal<string>('');

  updateHtmlAttr = effect(() => {
    this.document.documentElement.setAttribute('lang', this.lang());
  })

  setLang(lang: string) {
    this.lang.set(lang);
  }
}

export const setLang = (lang: string) => {
  inject(LangService).setLang(lang);
}
