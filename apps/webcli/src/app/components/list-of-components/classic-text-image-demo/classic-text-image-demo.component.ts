import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassicTextImageComponent, ClassicTextImageData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-classic-text-image-demo',
  standalone: true,
    imports: [CommonModule, ClassicTextImageComponent, ComponentCardComponent, Highlight],
  templateUrl: './classic-text-image-demo.component.html',
  styleUrl: './classic-text-image-demo.component.scss',
})
export class ClassicTextImageDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  classicTextImageData = signal<ClassicTextImageData>({
    title: 'A new feature',
    overtitle: 'Overtitle',
    overtitlePrimary: true,
    subtitle: 'Describe the feature in a few words',
    image: {
      link: '/pagespeed-input.webp',
      alt: 'Img description',
      objectFit: 'contain'
    },
    imageFirst: false
  });


  classicTextImageTsData = computed(() => {
    return `classicTextImageData = signal<CatchphraseData>(${JSON.stringify(this.classicTextImageData(), null, 2)});`
  });
  classicTextImageHtml = signal('<seok-classic-text-image [data]="classicTextImageData()"></seok-classic-text-image>');
  classicTextImageImport = signal(
    `import {ClassicTextImageComponent, ClassicTextImageData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., ClassicTextImageComponent],
  ...
})
`
  );
}
