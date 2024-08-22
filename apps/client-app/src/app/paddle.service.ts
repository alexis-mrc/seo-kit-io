import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { SeokPricesService } from '../../../../libs/seok-ui/src/lib/prices/prices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PaddleService {

  paddle = signal<Paddle | undefined>(undefined);

  isReady = computed(() => !!this.paddle());

  constructor() {
    afterNextRender(() => {
      initializePaddle({
        //environment: 'production',
        //token: 'live_c52bab719fe02225258ac2c336c'

        environment: 'sandbox',
        token: 'test_0f5f94cd7a91a81e786040606c3' // TEST
      }).then(paddle => this.paddle.set(paddle))
    });

    inject(SeokPricesService).priceClicked$.pipe(takeUntilDestroyed()).subscribe(click => {
      const paddle = this.paddle();
      if (paddle) {
        paddle.Checkout.open({
          settings: {
            displayMode: "overlay",
          },
          discountCode: 'LAUNCH',
          items: [{
            // Maker
          //   priceId: 'pri_01j24yqqvs0zxhj85dpw69qt5r',
            priceId: 'pri_01j257va7cd99m5fbgchn8hn3k', // TEST
            quantity: 1
          }]
        });
      }
    })
  }

}
