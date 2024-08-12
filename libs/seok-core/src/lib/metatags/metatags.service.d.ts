import { InjectionToken } from '@angular/core';
import { SeoData } from './metatags.builder';
export type updateSeoFnType = (data: SeoData<any>) => void;
/**
 * Token UPDATE_SEO
 * Useful to simplify testing
 */
export declare const UPDATE_SEO: InjectionToken<updateSeoFnType>;
/**
 * Provide UPDATE_SEO token
 */
export declare const provideUpdateSeo: () => {
    provide: InjectionToken<updateSeoFnType>;
    useValue: updateSeoFnType;
};
/**
 * Update the SEO for the page
 * @param data the seo data
 * Must be called in an injection context
 */
export declare const updateSeo: updateSeoFnType;
