import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink} from "@angular/router";
import { SeoKitStyle, SEO_KIT_STYLE, Link } from '@seo-kit-boilerplate/seok-ui';
import { NgOptimizedImage } from '@angular/common';
import {
  seokLogoHeight,
  seokLogoUrl,
  seokLogoWidth,
  seokWebsiteName
} from "@seo-kit-boilerplate/seok-generated/settings";
import { LangService } from '@seo-kit-boilerplate/seok-core/lang';
import {url as ExamplePillarUrl } from '../pages/example-pillar/example-pillar.page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  protected readonly logoUrl = signal(seokLogoUrl);
  protected readonly logoWidth = signal(seokLogoWidth);
  protected readonly logoHeight = signal(seokLogoHeight);
  protected readonly websiteName = signal(seokWebsiteName);

  linksByLang: Record<string, Link[]> = {
    'en': [
      {url: ExamplePillarUrl, label: 'Example Pillar'},
    ]
  };

  lang = inject(LangService).lang;
  links = computed(() => {
    const lang = this.lang();
    return this.linksByLang[lang] ?? [];
  });
}
