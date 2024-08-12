import {
  formatFiles,
  generateFiles,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { removeTrailingSlashes } from '../../utils';

export interface GlobalSettings {
  seokWebsiteName: string;
  seokWebsiteUrl: string;
  seokCreationDate: string;
  seokContactEmail: string;
  seokFavicon: string;
  seokLogoUrl: string;
  seokLogoWidth: string;
  seokLogoHeight: string;
  seokGlobalStyle: string;
}

export async function setGlobalGenerator(
  tree: Tree,
  options: unknown
) {
  const settings: Partial<GlobalSettings> = JSON.parse(tree.read('tmp/set-settings.json').toString());

  generateFiles(tree, path.join(__dirname, 'client-app'), 'apps/client-app', {
    websiteUrl: removeTrailingSlashes(settings.seokWebsiteUrl ?? ''), // remove trailing slash
  });

  generateFiles(tree, path.join(__dirname, 'seok-generated'), 'libs/seok-generated', {
    seoKitStyle: settings.seokGlobalStyle ?? "default",
    websiteName: settings.seokWebsiteName ?? '',
    websiteUrl: removeTrailingSlashes(settings.seokWebsiteUrl ?? ''), // remove trailing slash
    creationDate: settings.seokCreationDate ?? '',
    faviconUrl: settings.seokFavicon ?? '',
    logoUrl: settings.seokLogoUrl ?? '',
    logoWidth: settings.seokLogoWidth ?? '',
    logoHeight: settings.seokLogoHeight ?? '',
    contactEmail: settings.seokContactEmail ?? ''
  });

  await formatFiles(tree);
}

export default setGlobalGenerator;
