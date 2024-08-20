import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './angular-latest-version.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { RouterLink } from '@angular/router';
import { url } from '../angular-seo/angular-seo.page';

@Component({
  selector: 'app-angular-latest-version',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent, RouterLink],
  templateUrl: './angular-latest-version.component.html',
  styleUrl: './angular-latest-version.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class AngularLatestVersionComponent {

  angularSeoUrl = url;

  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
