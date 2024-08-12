import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PricesComponent, PricesData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-prices-demo',
  standalone: true,
    imports: [CommonModule, PricesComponent, ComponentCardComponent, Highlight],
  templateUrl: './prices-demo.component.html',
  styleUrl: './prices-demo.component.scss',
})
export class PricesDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  pricesData = signal<PricesData>( {
    plans: [
      {
        name: 'Basic',
        popular: undefined,
        prices: [
          {
            strokedValue: undefined,
            value: "20€",
            duration: "/ month",
            offText: undefined,
          },
          {
            strokedValue: "240€",
            value: "120€",
            duration: "/ year",
            offText: "50% off",
          }
        ],
        features: [
          {
            aviable: true,
            label: 'A basic feature'
          },
          {
            aviable: false,
            label: 'A premium feature'
          },
        ],
        cta: {
          link: {
            url: '/',
            label: 'the button',
          },
          incentiveSentence: 'Click on the button !'
        }
      },
      {
        name: 'Premium',
        popular: 'Most popular',
        prices: [
          {
            strokedValue: undefined,
            value: "50€",
            duration: "/ month",
            offText: undefined,
          },
          {
            strokedValue: "600€",
            value: "300€",
            duration: "/ year",
            offText: "50% off",
          }
        ],
        features: [
          {
            aviable: true,
            label: 'A basic feature'
          },
          {
            aviable: true,
            label: 'A premium feature'
          },
        ],
        cta: {
          link: {
            url: '/',
            label: 'the button',
          },
          incentiveSentence: 'Click on the button !'
        }
      }
    ],
    pricesPossibilities: ['monthly', 'yearly'],
    pricesPossibilitiesSubtext: '50% off when yearly'
  });


  pricesTsData = computed(() => {
    return `pricesData = signal<CatchphraseData>(${JSON.stringify(this.pricesData(), null, 2)});`
  });
  pricesHtml = signal('<seok-prices [data]="pricesData()"></seok-prices>');
  pricesImport = signal(
    `import {PricesComponent, PricesData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., PricesComponent],
  ...
})
`
  );
}
