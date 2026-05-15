import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { AngularMaterialRuntimeTheme } from 'lib';

import { MaterialShowcase } from './material-showcase/material-showcase';

const PRESET_COLORS = [
  { label: 'Violet', value: '#6750A4' },
  { label: 'Blue', value: '#0061A4' },
  { label: 'Green', value: '#386A20' },
  { label: 'Orange', value: '#9A4500' },
  { label: 'Pink', value: '#984061' },
  { label: 'Teal', value: '#006874' },
] as const;

@Component({
  selector: 'app-root',
  imports: [FormsModule, MaterialShowcase, MatToolbar, MatIcon, MatSlideToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly theme = inject(AngularMaterialRuntimeTheme);

  protected readonly presetColors = PRESET_COLORS;
  protected readonly primaryColor = signal('#6750A4');
  protected readonly isDark = signal(false);

  constructor() {
    effect(() => {
      void this.theme.setTheme({ primary: this.primaryColor() });
    });

    effect(() => {
      this.document.body.style.colorScheme = this.isDark() ? 'dark' : 'light';
    });
  }

  protected onColorInput(event: Event): void {
    this.primaryColor.set((event.target as HTMLInputElement).value);
  }

  protected selectPreset(color: string): void {
    this.primaryColor.set(color);
  }

  protected onThemeToggle(checked: boolean): void {
    this.isDark.set(checked);
  }
}
