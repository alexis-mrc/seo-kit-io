import {ChangeDetectorRef, Component, computed, inject, PLATFORM_ID, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {GlobalSettings, SettingsService} from "./settings.service";
import {AssetsService} from "../assets/assets.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  settingsService = inject(SettingsService);
  assetsService = inject(AssetsService);
  cdr = inject(ChangeDetectorRef);

  settings = signal<Partial<GlobalSettings>>({});
  assets = signal<string[]>([]);

  errorFavicon = computed<'' | 'not-an-assets' | 'not-an-image'>(() => {
    const favicon = this.settings()?.seokFavicon;

    if (!favicon) {
      return '';
    }

    if (!this.assets().includes(favicon)) {
      return 'not-an-assets'
    }

    if (!this.assetsService.isImage(favicon)) {
      return 'not-an-image';
    }

    return '';
  });

  errorLogo = computed<'' | 'not-an-assets' | 'not-an-image'>(() => {
    const logo = this.settings()?.seokLogoUrl;

    if (!logo) {
      return '';
    }

    if (!this.assets().includes(logo)) {
      return 'not-an-assets'
    }

    if (!this.assetsService.isImage(logo)) {
      return 'not-an-image';
    }

    return '';
  });

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.settingsService.getSettings().subscribe(res => {
        this.settings.set(res)
      });

      this.assetsService.getAssets().subscribe(res => {
        this.assets.set(res)
      });
    }
  }
}
