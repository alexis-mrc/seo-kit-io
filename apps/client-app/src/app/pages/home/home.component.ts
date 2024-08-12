import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './home.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
