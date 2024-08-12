import {Component, signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgClass} from "@angular/common";


@Component({
  standalone: true,
  imports: [RouterModule, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  menuItems = signal<{label: string; link: string;}[]>([
    {
      label: '📋 Dashboard',
      link: 'dashboard'
    },
    {
      label: '⚙️ Settings',
      link: 'settings'
    },
    {
      label: '🎨 Styles',
      link: 'styles'
    },
    {
      label: '⚡ Components',
      link: 'components'
    },
    {
      label: '📝 Pages',
      link: 'pages'
    },
    {
      label: '🖼️ Assets',
      link: 'assets',
    },
    {
      label: '🚀 Deploy',
      link: 'deploy'
    }
  ]);

}
