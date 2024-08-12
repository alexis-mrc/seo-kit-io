import {Component, inject, input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { TestimonialData } from './testimonies.model';
import { isLink } from '../seok-ui.utils';

@Component({
  selector: 'seok-testimonies',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './testimonies.component.html',
  styleUrl: './testimonies.component.scss'
})
export class TestimoniesComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<TestimonialData[]>();
  protected readonly isLink = isLink;
}
