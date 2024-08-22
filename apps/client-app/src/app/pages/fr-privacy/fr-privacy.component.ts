import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { addAlternateLangHref, updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './fr-privacy.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { url as enUrl } from '../privacy/privacy.page';

@Component({
  selector: 'app-fr-privacy',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './fr-privacy.component.html',
  styleUrl: './fr-privacy.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class FrPrivacyComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
    addAlternateLangHref('en', '/' + enUrl);
  }
}
