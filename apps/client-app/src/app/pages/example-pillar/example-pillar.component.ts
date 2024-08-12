import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './example-pillar.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';

@Component({
  selector: 'app-example-pillar',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent],
  templateUrl: './example-pillar.component.html',
  styleUrl: './example-pillar.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ExamplePillarComponent {
  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
