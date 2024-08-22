import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { addAlternateLangHref, updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './fr-terms-of-service.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { url as enUrl } from '../terms-of-service/terms-of-service.page';

@Component({
  selector: 'app-fr-terms-of-service',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './fr-terms-of-service.component.html',
  styleUrl: './fr-terms-of-service.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class FrTermsOfServiceComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
    addAlternateLangHref('en', '/' + enUrl);
  }
}
