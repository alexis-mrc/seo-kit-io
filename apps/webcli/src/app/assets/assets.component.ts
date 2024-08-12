import {Component, computed, inject, PLATFORM_ID, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser, JsonPipe} from '@angular/common';
import {AssetsService} from "./assets.service";
import {FontDisplayComponent} from "../styles/font-display/font-display.component";

export interface AssetsOrFolder {
  files: Record<string, AssetsOrFolder>;
}

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, JsonPipe, FontDisplayComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {

  assetsService = inject(AssetsService);

  assets = signal<string[]>([]);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.assetsService.getAssets().subscribe(res => {
        this.assets.set(res)
      });
    }
  }

  onAssetsSelected(event: any) {
    const selectedFiles: File[] = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      this.assetsService.uploadFiles(selectedFiles);
    }
  }
}
