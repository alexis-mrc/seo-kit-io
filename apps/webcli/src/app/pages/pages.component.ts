import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {SettingsService} from "../settings/settings.service";
import {RouterLink} from "@angular/router";
import {PagesService} from "./pages.service";
import {SeokPageState} from "@seo-kit-boilerplate/seok-core/pages";
import {SitemapFormComponent} from "./sitemap-form/sitemap-form.component";
import {SitemapData} from "@seo-kit-boilerplate/seok-core/sitemap";
import {MetatagsFormComponent} from "./metatags-form/metatags-form.component";
import {Metatags} from "@seo-kit-boilerplate/seok-core/metatags";

export interface PageData {
  id: string;
  url: string;
  lang: string;
  state: SeokPageState;
  sitemap: SitemapData;
  metatags: Metatags;
}

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, CdkTableModule, RouterLink, SitemapFormComponent, MetatagsFormComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {

  settingsService = inject(SettingsService);
  pagesService = inject(PagesService);

  exampleUrl = 'https://example.com';
  websiteUrl = signal<string>(this.exampleUrl)

  openedRowId = signal<string[]>([]);
  allPages = signal<Partial<PageData>[]>([]);

  metatagsEdited: Record<string, Metatags> = {};
  sitemapEdited: Record<string, SitemapData> = {};

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.settingsService.getSettings().subscribe(res => {
        this.websiteUrl.set(res?.seokWebsiteUrl ?? this.exampleUrl)
      });

      this.pagesService.getPages().subscribe(res => {
        this.allPages.set(res);
      })
    }
  }

  isOpen(id: string) {
    return this.openedRowId().indexOf(id) > -1;
  }

  toggleOpen(idToToggle: string) {
    this.openedRowId.update(ids => {
      // Check if the ID is already in the list
      const index = ids.indexOf(idToToggle);

      if (index > -1) {
        // ID is already in the list, so remove it
        return ids.filter(id => id !== idToToggle);
      } else {
        // ID is not in the list, so add it
        return [...ids, idToToggle];
      }
    });
  }

  addPage(id: string) {
    const cleanedId = this.cleanPageName(id);

    if (!cleanedId) {
      alert('Id is empty or invalid (should match start with a letter and contains only alphanumeric, -)');
    } else {
      this.pagesService.addPage(cleanedId);
      this.toggleOpen(cleanedId);
      return true;
    }
    return false;
  }

  deletePage(element: Partial<PageData>) {
    if (!element.id) {
      alert('Error : id is unknown');
    } else if (confirm(`Delete page with id ${element.id} ?`)) {
      this.pagesService.deletePage(element.id);
    }
  }

  updatePage(element: Partial<PageData>, lang: string, url: string, state: string) {
    if (!element.id) {
      alert('Error : id is unknown');
    } else {
      this.pagesService.updatePage({
        ...element,
        lang,
        url,
        state: state as SeokPageState,
        sitemap: this.sitemapEdited[element.id] ?? element.sitemap,
        metatags: this.metatagsEdited[element.id] ?? element.metatags,
      });
    }
  }

  updateSitemap(element: Partial<PageData>, sitemap: SitemapData) {
    if (element.id) {
      this.sitemapEdited[element.id] = sitemap;
    }
  }

  updateMetatags(element: Partial<PageData>, metatags: Metatags) {
    if (element.id) {
      this.metatagsEdited[element.id] = metatags;
    }
  }

  generateHtml(event: any | null, path: string) {
    const selectedFiles: File[] = Array.from(event.target.files);
    if (selectedFiles.length > 0) {

      const pathHtml = path.replace(/page\.ts$/, "component.html");

      if (confirm(`Generate file for page ${pathHtml} ?`)) {
        this.pagesService.generateMdToHtml(selectedFiles[0], pathHtml);
      }
    }
  }

  cleanPageName(name: string): string | null {
    // Regular expression to match valid names
    const validNameRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

    // Trim the input name
    const trimmedName = name.trim();

    // Check if the trimmed name is valid
    if (validNameRegex.test(trimmedName)) {
      return trimmedName;
    }

    // Return null if the name is invalid
    return null;
  }
}


