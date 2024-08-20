import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './terms-of-service.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';

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
  }
}
