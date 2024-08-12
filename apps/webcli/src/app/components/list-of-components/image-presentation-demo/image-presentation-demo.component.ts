import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImagePresentationComponent, ImagePresentationData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-image-presentation-demo',
  standalone: true,
    imports: [CommonModule, ImagePresentationComponent, ComponentCardComponent, Highlight],
  templateUrl: './image-presentation-demo.component.html',
  styleUrl: './image-presentation-demo.component.scss',
})
export class ImagePresentationDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  imagePresentationData = signal<ImagePresentationData>( {
    img: {
      alt: 'Screenshot of pagespeed',
      link: '/pagespeed-input.webp',
      objectFit: 'contains',
      caption: 'Pagespeed input to test your application.'
    },
    width: '1978',
    height: '934',
    loading: 'auto'
  });


  imagePresentationTsData = computed(() => {
    return `imagePresentationData = signal<ImagePresentationData>(${JSON.stringify(this.imagePresentationData(), null, 2)});`
  });
  imagePresentationHtml = signal('<seok-image-presentation [data]="imagePresentationData()"></seok-image-presentation>');
  imagePresentationImport = signal(
    `import {ImagePresentationComponent, ImagePresentationData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., ImagePresentationComponent],
  ...
})
`
  );
}
