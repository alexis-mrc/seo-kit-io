import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './legal-notice.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class LegalNoticeComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
