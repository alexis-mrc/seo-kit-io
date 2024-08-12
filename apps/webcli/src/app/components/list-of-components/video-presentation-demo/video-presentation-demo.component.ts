import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoPresentationComponent, VideoPresentationData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-video-presentation-demo',
  standalone: true,
  imports: [CommonModule, VideoPresentationComponent, ComponentCardComponent, Highlight],
  templateUrl: './video-presentation-demo.component.html',
  styleUrl: './video-presentation-demo.component.scss',
})
export class VideoPresentationDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  videoPresentationData = signal<VideoPresentationData>({
    type: 'default',
    poster: '',
    link: 'https://videos.pexels.com/video-files/4800434/4800434-hd_1280_720_30fps.mp4',
    widthClass: 'w-[80%]'
  });


  videoPresentationTsData = computed(() => {
    return `videoPresentationData = signal<VideoPresentationData>(${JSON.stringify(this.videoPresentationData(), null, 2)});`
  });
  videoPresentationHtml = signal('<seok-video-presentation [data]="videoPresentationData()"></seok-video-presentation>');
  videoPresentationImport = signal(
    `import {VideoPresentationComponent, VideoPresentationData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., VideoPresentationComponent],
  ...
})
`
  );
}
