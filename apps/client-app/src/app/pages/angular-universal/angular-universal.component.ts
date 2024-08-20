import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './angular-universal.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { url } from '../angular-seo/angular-seo.page';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-angular-universal',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent, Highlight, RouterLink],
  templateUrl: './angular-universal.component.html',
  styleUrl: './angular-universal.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class AngularUniversalComponent {

  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }

  protected readonly angularSeoUrl = url;
}
