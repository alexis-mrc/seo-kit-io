import {Component, computed, inject, input, signal} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { PricesData } from './prices.model';
import {SeokPricesService} from "./prices.service";
import { isExternalLink } from '../seok-ui.utils';

@Component({
  selector: 'seok-prices',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgStyle
  ],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<PricesData>();
  currentPricePossibilitiesIndex = signal<number>(0);

  seokPricesService = inject(SeokPricesService);

  protected readonly isExternalLink = isExternalLink;
}
