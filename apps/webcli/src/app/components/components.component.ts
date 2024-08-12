import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {CommonModule, isPlatformBrowser, NgClass} from '@angular/common';
import {GlobalSettings, SettingsService} from "../settings/settings.service";
import {DefaultStyleComponent} from "./default-style/default-style.component";
import {YankeesStyleComponent} from "./yankees-style/yankees-style.component";

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, DefaultStyleComponent, YankeesStyleComponent, NgClass],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
})
export class ComponentsComponent {

  settingsService = inject(SettingsService);

  settings = signal<Partial<GlobalSettings>>({})
  darkMode = signal<'light' | 'dark'>('light');

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.settingsService.getSettings().subscribe(res => {
        this.settings.set(res)
      });
    }
  }
}
