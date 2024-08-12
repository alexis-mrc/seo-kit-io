import {afterNextRender, Component, computed, effect, input, OnInit, output, signal, untracked} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ColorHues, generateTailwindPalette, paletteToArray} from "../colors.utils";

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss'
})
export class ColorPaletteComponent {

  label = input.required<string>();
  palette = input.required<Partial<ColorHues>>();

  selectedColor = signal<string | undefined>(undefined);


  computedSelectedColor = computed(() => {
    const selectedColor = this.selectedColor();

    if (selectedColor && selectedColor.startsWith('#') && selectedColor?.length === 7) {
      return selectedColor;
    }
    return '#000000';
  })

  updatedPalette = output<ColorHues>();

  protected readonly paletteToArray = paletteToArray;

  constructor() {
    effect(() => {
      if (untracked(this.selectedColor) === undefined) {
        this.selectedColor.set(this.palette()['500']);
      }
    }, {allowSignalWrites: true});
  }

  setSelectedColor(color: string) {
    if (this.selectedColor() === color) {
      return;
    }

    this.selectedColor.set(color);

    if (color.length === 7 && color.startsWith('#')) {
      this.updatedPalette.emit(generateTailwindPalette(color, false));
    }
  }
}
