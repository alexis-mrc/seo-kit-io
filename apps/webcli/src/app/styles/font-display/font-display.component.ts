import {Component, computed, ElementRef, inject, input, OnInit, output, signal} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {Fonts} from "../fonts.service";
import {AssetsService} from "../../assets/assets.service";

@Component({
  selector: 'app-font-display',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './font-display.component.html',
  styleUrl: './font-display.component.scss'
})
export class FontDisplayComponent implements OnInit {

  assetsService = inject(AssetsService);
  elRef = inject(ElementRef);

  path = input.required<string>();
  fonts = input.required<Fonts>();
  isTitleRegular = computed(() => this.path() === this.fonts().titleRegular);
  isTitleBold = computed(() => this.path() === this.fonts().titleBold);
  isTitleItalic = computed(() => this.path() === this.fonts().titleItalic);
  isMainRegular = computed(() => this.path() === this.fonts().mainRegular);
  isMainBold = computed(() => this.path() === this.fonts().mainBold);
  isMainItalic = computed(() => this.path() === this.fonts().mainItalic);

  fontSize = signal<number>(0);
  fontSizeInKb = computed<number>(() => this.fontSize() / 1024);

  updatedFonts = output<Fonts>();
  deleteFont = output<string>();
  deleted = false;

  ngOnInit() {
    this.loadFonts();
  }

  delete() {
    this.deleted = true;
    this.deleteFont.emit(this.path());
  }

  loadFonts() {
    const path = this.assetsService.getAssetLink(this.path());
    fetch(path).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    }).then(blob => {
      const fontSize = blob.size; // Size in bytes
      const font = new FontFace(path, `url(${path})`);

      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        this.fontSize.set(fontSize);
        this.elRef.nativeElement.style.setProperty('--current-font', "'" + path + "'");
      }).catch(error => {
        console.error('Failed to load font:', error);
      });
    }).catch(error => {
      console.error('Failed to fetch font:', error);
    });
  }

  updateFonts(titleRegular: boolean, titleBold: boolean, titleItalic: boolean, mainRegular: boolean, mainBold: boolean, mainItalic: boolean): void {
    if (this.deleted) {
      return;
    }

    const fonts = structuredClone(this.fonts());
    if (titleRegular) {
      fonts.titleRegular = this.path();
    } else if (fonts.titleRegular === this.path()) {
      fonts.titleRegular = '';
    }
    if (titleBold) {
      fonts.titleBold = this.path();
    } else if (fonts.titleBold === this.path()) {
      fonts.titleBold = '';
    }
    if (titleItalic) {
      fonts.titleItalic = this.path();
    } else if (fonts.titleItalic === this.path()) {
      fonts.titleItalic = '';
    }

    if (mainRegular) {
      fonts.mainRegular = this.path();
    } else if (fonts.mainRegular === this.path()) {
      fonts.mainRegular = '';
    }
    if (mainBold) {
      fonts.mainBold = this.path();
    } else if (fonts.mainBold === this.path()) {
      fonts.mainBold = '';
    }
    if (mainItalic) {
      fonts.mainItalic = this.path();
    } else if (fonts.mainItalic === this.path()) {
      fonts.mainItalic = '';
    }

    this.updatedFonts.emit(fonts);
  }
}
