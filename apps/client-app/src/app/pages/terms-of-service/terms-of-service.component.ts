import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { addAlternateLangHref, updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang, url as enUrl } from './terms-of-service.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { url as frUrl } from '../fr-terms-of-service/fr-terms-of-service.page';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class TermsOfServiceComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
    addAlternateLangHref('fr', '/' + frUrl);
    addAlternateLangHref('en', '/' + enUrl);
    addAlternateLangHref('x-default', '/' + enUrl);
  }
}
