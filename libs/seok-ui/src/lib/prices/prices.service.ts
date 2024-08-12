import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SeokPricesService {

  /**
   * Subject of prices clicks
   */
  priceClicked = new Subject<{planIndex: number, priceIndex: number}>();

  /**
   * Emit when a price is clicked
   */
  priceClicked$ = this.priceClicked.asObservable();
}
