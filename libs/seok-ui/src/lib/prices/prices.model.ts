import {CallToActionData} from '../call-to-action/call-to-action.model';

export interface PricesData {
  plans: Plan[];
  pricesPossibilities: string[];
  pricesPossibilitiesSubtext?: string;
}

export interface Plan {
  name: string;
  popular?: string;
  prices: PriceDetail[];
  features: Feature[];
  cta: CallToActionData;
}

export interface PriceDetail {
  strokedValue?: string;
  value: string;
  duration: string;
  offText?: string;
}

export interface Feature {
  aviable: boolean;
  label: string;
}
