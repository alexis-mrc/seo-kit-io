import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentCardComponent} from "./component-card/component-card.component";
import {CatchphraseDemoComponent} from "./catchphrase-demo/catchphrase-demo.component";
import {BigTitleDemoComponent} from "./big-title-demo/big-title-demo.component";
import {CallToActionDemoComponent} from "./call-to-action-demo/call-to-action-demo.component";
import {ClassicTextImageDemoComponent} from "./classic-text-image-demo/classic-text-image-demo.component";
import {FaqDemoComponent} from "./faq-demo/faq-demo.component";
import {ImagePresentationDemoComponent} from "./image-presentation-demo/image-presentation-demo.component";
import {PricesDemoComponent} from "./prices-demo/prices-demo.component";
import {TestimoniesDemoComponent} from "./testimonies-demo/testimonies-demo.component";
import {VideoPresentationDemoComponent} from "./video-presentation-demo/video-presentation-demo.component";

@Component({
  selector: 'app-list-of-components',
  standalone: true,
  imports: [CommonModule, CatchphraseDemoComponent, ComponentCardComponent, BigTitleDemoComponent, CallToActionDemoComponent, ClassicTextImageDemoComponent, FaqDemoComponent, ImagePresentationDemoComponent, PricesDemoComponent, TestimoniesDemoComponent, VideoPresentationDemoComponent],
  templateUrl: './list-of-components.component.html',
  styleUrl: './list-of-components.component.scss',
})
export class ListOfComponentsComponent {

}
