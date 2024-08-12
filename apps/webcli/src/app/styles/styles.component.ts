import {afterNextRender, Component, computed, inject, PLATFORM_ID, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Colors, ColorsService} from "./colors.service";
import {ColorHues} from "./colors.utils";
import {ColorPaletteComponent} from "./color-palette/color-palette.component";
import {Fonts, FontsService} from "./fonts.service";
import {FontDisplayComponent} from "./font-display/font-display.component";

@Component({
  selector: 'app-styles',
  standalone: true,
  imports: [CommonModule, ColorPaletteComponent, FontDisplayComponent],
  templateUrl: './styles.component.html',
  styleUrl: './styles.component.scss',
})
export class StylesComponent {

  colorsService = inject(ColorsService);
  colors = signal<Colors>({});
  primaryColor = computed<Partial<ColorHues>>(() => this.colors().primary ?? {});
  secondaryColor = computed<Partial<ColorHues>>(() => this.colors().secondary ?? {});
  neutralColor = computed<Partial<ColorHues>>(() => this.colors().neutral ?? {});
  darkMode = computed<'media' | '[selector, htmlnever]' | '[selector, html]'>(() => this.colors().darkMode ?? 'media');

  fontsService = inject(FontsService);
  fonts = signal<{fontsCss: Fonts, fontsAviable: string[]}>({
    fontsAviable: [],
    fontsCss: {}
  });
  fontsAviable = computed(() => this.fonts().fontsAviable);
  fontsCss = computed(() => this.fonts().fontsCss);

  withInfosFonts = computed<{path: string, label: string; state: 'missing' | 'empty' | 'ok'}[]>(() => {
    const withInfosFonts: {path: string, label: string; state: 'missing' | 'empty' | 'ok'}[] = [];
    const fonts = this.fonts();
    const aviable = fonts.fontsAviable ?? [];

    withInfosFonts.push({path: fonts?.fontsCss?.titleRegular ? fonts.fontsCss.titleRegular : '', label: 'Title Regular', state: !fonts?.fontsCss?.titleRegular ? 'empty' : (aviable.includes(fonts.fontsCss.titleRegular) ? 'ok' : 'missing')});
    withInfosFonts.push({path: fonts?.fontsCss?.titleBold ? fonts.fontsCss.titleBold : '', label: 'Title Bold', state: !fonts?.fontsCss?.titleBold ? 'empty' : (aviable.includes(fonts.fontsCss.titleBold) ? 'ok' : 'missing')});
    withInfosFonts.push({path: fonts?.fontsCss?.titleItalic ? fonts.fontsCss.titleItalic : '', label: 'Title Italic', state: !fonts?.fontsCss?.titleItalic ? 'empty' : (aviable.includes(fonts.fontsCss.titleItalic) ? 'ok' : 'missing')});
    withInfosFonts.push({path: fonts?.fontsCss?.mainRegular ? fonts.fontsCss.mainRegular : '', label: 'Main Regular', state: !fonts?.fontsCss?.mainRegular ? 'empty' : (aviable.includes(fonts.fontsCss.mainRegular) ? 'ok' : 'missing')});
    withInfosFonts.push({path: fonts?.fontsCss?.mainBold ? fonts.fontsCss.mainBold : '', label: 'Main Bold', state: !fonts?.fontsCss?.mainBold ? 'empty' : (aviable.includes(fonts.fontsCss.mainBold) ? 'ok' : 'missing')});
    withInfosFonts.push({path: fonts?.fontsCss?.mainItalic ? fonts.fontsCss.mainItalic : '', label: 'Main Italic', state: !fonts?.fontsCss?.mainItalic ? 'empty' : (aviable.includes(fonts.fontsCss.mainItalic) ? 'ok' : 'missing')});

    return withInfosFonts;
  });

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.colorsService.getColors().subscribe(res => {
        this.colors.set(res)
      });

      this.fontsService.getFonts().subscribe(res => {
        this.fonts.set(res);
      });
    }
  }

  onFontsSelected(event: any) {
    const selectedFiles: File[] = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      this.fontsService.uploadFiles(selectedFiles);
    }
  }

  updatedFonts(fonts: Fonts) {
    const fontsAviable = structuredClone(this.fonts().fontsAviable);

    this.fonts.set({
      fontsAviable,
      fontsCss: fonts
    });

    this.fontsService.updateFonts(fonts)
  }

  deleteFont(font: string) {
    this.fontsService.deleteFont(font)
  }
}
