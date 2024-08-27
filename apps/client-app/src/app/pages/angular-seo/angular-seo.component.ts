import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { addAlternateLangHref, updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang, url as enUrl } from './angular-seo.page';
import { ImagePresentationComponent } from '@seo-kit-boilerplate/seok-ui';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { url as latestAngularVersionUrl } from '../angular-latest-version/angular-latest-version.page';
import { url as angularUniversalUrl } from '../angular-universal/angular-universal.page';
import { url as frUrl } from '../fr-angular-seo/fr-angular-seo.page';


@Component({
  selector: 'app-angular-seo',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent, Highlight, RouterLink],
  templateUrl: './angular-seo.component.html',
  styleUrl: './angular-seo.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class AngularSeoComponent {

  metaUpdateTitleCode = signal(`import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Your Page Title');
   }
 }`);

  metaUpdateCustomTagsCode = signal(`import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent implements OnInit {
  constructor(private meta: Meta) { }

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Your Page Description' });
  }
}`);

  metaUpdateTagsOgCode = signal(`import { Meta } from '@angular/platform-browser';

...

constructor(private meta: Meta) { }

ngOnInit() {
  this.meta.updateTag({ property: 'og:title', content: 'Your Open Graph Title' });
  this.meta.updateTag({ property: 'og:description', content: 'Brief description for sharing' });
  this.meta.updateTag({ property: 'og:image', content: 'https://example.com/image.jpg' });
  this.meta.updateTag({ property: 'og:url', content: 'https://example.com/page' });
}`);

  metaUpdateTagsTwitterCode = signal(`import { Meta } from '@angular/platform-browser';

...

constructor(private meta: Meta) { }

ngOnInit() {
  this.meta.updateTag({ name: 'twitter:title', content: 'Your Twitter Card Title' });
  this.meta.updateTag({ name: 'twitter:description', content: 'Brief description for Twitter sharing' });
  this.meta.updateTag({ name: 'twitter:image', content: 'https://example.com/image.jpg' });
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
}`);

  metaUpdateTagsCanonicalCode = signal(`import { Meta } from '@angular/platform-browser';

...

canonicalUrl = 'your url...';

constructor(private meta: Meta) { }

ngOnInit() {
  this.meta.updateTag({ rel: 'canonical', href: canonicalUrl });
}`);

  deferExempleCode = signal( `<button (click)="loadLargeComponent()">Load Large Component</button>

@defer (on interaction) {
  <app-large-component></app-large-component>
} @placeholder {
  <div>Loading...</div>
} @loading (minimum 500ms) {
  <img src="loading.gif" alt="Loading...">
};`);

  imageCode = signal('<img ngSrc="cat.jpg" width="400" height="200" priority>');

  sitemapCode = signal(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-07-04</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-07-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs here -->
</urlset>`);

  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
    addAlternateLangHref('fr', '/' + frUrl);
    addAlternateLangHref('en', '/' + enUrl);
    addAlternateLangHref('x-default', '/' + enUrl);
  }

  protected readonly latestAngularVersionUrl = latestAngularVersionUrl;
  protected readonly angularUniversalUrl = angularUniversalUrl;
}
