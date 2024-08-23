import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SEO_KIT_STYLE, SeoKitStyle } from '@seo-kit-boilerplate/seok-ui';
import {setFavicon} from "@seo-kit-boilerplate/seok-core/favicon";
import {seokFavicon} from "@seo-kit-boilerplate/seok-generated/settings";

@Component({
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  constructor() {
    setFavicon(seokFavicon);
  }
}
