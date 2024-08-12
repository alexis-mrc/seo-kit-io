import {UPDATE_METATAGS} from './metatags.service';
import {Metatags} from "./metatags.model";
import {expect} from '@jest/globals';

/**
 * Return the updateMetatags Provider and expect it to be called with expectedData on construct
 * @param expectedData Metatags expected to be called on construct
 */
export const getUpdateMetatagsProviderAndExpect = (expectedData: Metatags) => {
  return {provide: UPDATE_METATAGS, useValue: (data: Metatags) => expect(data).toEqual(expectedData) };
}
