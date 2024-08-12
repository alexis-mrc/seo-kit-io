import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, inject,
  input
} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import { ImagePresentationData } from './image-presentation.model';
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'seok-image-presentation',
  standalone: true,
  imports: [NgClass, NgOptimizedImage, NgStyle],
  templateUrl: './image-presentation.component.html',
  styleUrl: './image-presentation.component.scss'
})
export class ImagePresentationComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  cdr = inject(ChangeDetectorRef);

  data = input.required<ImagePresentationData>();
}
