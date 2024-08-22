import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { addAlternateLangHref, updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './privacy.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { url as frUrl } from '../fr-privacy/fr-privacy.page';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class PrivacyComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
    addAlternateLangHref('fr', '/' + frUrl);
  }
}
