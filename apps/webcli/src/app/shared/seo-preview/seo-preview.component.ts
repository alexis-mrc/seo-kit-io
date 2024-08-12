import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-seo-preview',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './seo-preview.component.html',
  styleUrl: './seo-preview.component.scss',
})
export class SeoPreviewComponent {

  title = input<string>('');
  faviconUrl = input<string>('');
  websiteName = input<string>('');
  websiteUrl = input<string>('');
  description = input<string>('');
  image = input<string>('');
}
