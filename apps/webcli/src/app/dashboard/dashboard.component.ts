import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

}
