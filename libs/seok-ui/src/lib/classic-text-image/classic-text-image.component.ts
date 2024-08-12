import {Component, inject, input} from '@angular/core';
import {NgClass, NgComponentOutlet, NgOptimizedImage} from "@angular/common";
import { ClassicTextImageData } from './classic-text-image.model';
import { ImagePresentationComponent } from '../image-presentation/image-presentation.component';
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';

@Component({
  selector: 'seok-classic-text-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgComponentOutlet,
    NgClass,
    ImagePresentationComponent
  ],
  templateUrl: './classic-text-image.component.html',
  styleUrl: './classic-text-image.component.scss'
})
export class ClassicTextImageComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<ClassicTextImageData>();

}
