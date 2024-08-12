import {isValidDateString, StringDate} from "../string-date/string-date";

const PRIORITY_VALUES = [
  '0.0', '0.1', '0.2', '0.3', '0.4', '0.5',
  '0.6', '0.7', '0.8', '0.9', '1.0'
] as const;
export type PriorityValues = typeof PRIORITY_VALUES[number];

const FREQ_VALUES = [
  "always", "hourly", "daily", "weekly",
  "monthly", "yearly", "never"
] as const;
export type FreqValues = typeof FREQ_VALUES[number];
export type LastMod = StringDate;

/**
 * Sitemap Image data
 */
export type SitemapImage = {
  loc?: string;
  caption?: string;
  title?: string;
};

/**
 * Sitemap data for a route
 */
export type SitemapData = {
  priority?: PriorityValues;
  lastmod?: LastMod;
  changefreq?: FreqValues;
  images?: SitemapImage[];
}

export function isPriorityValue(value: any): value is PriorityValues {
  return PRIORITY_VALUES.includes(value);
}

export function isFreqValue(value: any): value is FreqValues {
  return FREQ_VALUES.includes(value);
}

export function isSitemapImage(value: any): value is SitemapImage {
  return typeof value === 'object' &&
    (value.loc === undefined || typeof value.loc === 'string') &&
    (value.caption === undefined || typeof value.caption === 'string') &&
    (value.title === undefined || typeof value.title === 'string');
}

export function isSitemapData(value: any): value is SitemapData {
  return typeof value === 'object' &&
    (!value.priority || isPriorityValue(value.priority)) &&
    (!value.lastmod || isValidDateString(value.lastmod)) &&
    (!value.changefreq || isFreqValue(value.changefreq)) &&
    (value.images === undefined || (
      Array.isArray(value.images) && value.images.every(isSitemapImage)
    ));
}
