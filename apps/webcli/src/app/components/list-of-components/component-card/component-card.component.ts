import {Component, input} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-component-card',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './component-card.component.html',
  styleUrl: './component-card.component.scss',
})
export class ComponentCardComponent {

  classAdded = input<string>();

}
