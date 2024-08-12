import {InjectionToken} from '@angular/core';

/**
 * Token SEO_KIT_STYLE
 * Useful to change style of component
 */
export const SEO_KIT_STYLE = new InjectionToken<string>('SEO_KIT_STYLE');
export type SeoKitStyle = 'default' | 'yankees';
