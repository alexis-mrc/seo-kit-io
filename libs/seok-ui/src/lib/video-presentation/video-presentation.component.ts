import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef, inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import {DOCUMENT, NgClass} from "@angular/common";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { VideoPresentationData } from './video-presentation.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'seok-video-presentation',
  standalone: true,
  imports: [NgClass],
  templateUrl: './video-presentation.component.html',
  styleUrl: './video-presentation.component.scss'
})
export class VideoPresentationComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<VideoPresentationData>();

  videoContainer = viewChild.required<ElementRef<HTMLDivElement>>('videoContainer');

  doc = inject(DOCUMENT);
  video: HTMLVideoElement | null = null;
  videoPlaying = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.video = this.doc.createElement('video');
      this.video.className = 'col-[1/1] row-[1/1] object-cover w-full';
      this.video.src = this.data().link;
      this.video.poster = this.data().poster ?? '';
      this.video.autoplay = this.data().type === 'autoplay' || this.data().type === 'loop';
      this.video.loop = this.data().type === 'loop';
      this.videoPlaying.set(this.data().type === 'autoplay' || this.data().type === 'loop');
      this.video.controls = false;
      this.videoContainer().nativeElement.append(this.video);
    });
  }

  isPlaying() {
    return this.video !== null && this.video.currentTime > 0 && !this.video.paused && !this.video.ended;
  }

  toggleVideo() {
    if (this.video !== null) {
      if (this.isPlaying()) {
        this.video.pause();
        this.videoPlaying.set(false);
      } else {
        this.video.play();
        this.videoPlaying.set(true);
      }
    }
  }
}
