import { DOCUMENT, inject, Injectable } from '@angular/core';
import {
  argbFromHex,
  DislikeAnalyzer,
  Hct,
  hexFromArgb,
  TemperatureCache,
  TonalPalette,
} from '@material/material-color-utilities';

/** Runtime theme configuration */
export interface Theme {
  /** Primary color in hex format (e.g. `#6750A4`) */
  primary: string;
  /** Root element for the theme (defaults to `document.documentElement`) */
  element?: HTMLElement;
}

/** Service for managing Angular Material runtime themes. */
@Injectable({ providedIn: 'root' })
export class AngularMaterialRuntimeTheme {
  private document = inject(DOCUMENT);

  /** Sets the runtime theme for the application. */
  setTheme(theme: Theme): void {
    const root = theme.element ?? this.document.documentElement;

    const primaryHct = Hct.fromInt(argbFromHex(theme.primary));

    const palettes = {
      primary: TonalPalette.fromHct(primaryHct),
      secondary: TonalPalette.fromHueAndChroma(primaryHct.hue, Math.max(primaryHct.chroma / 3, 16)),
      tertiary: TonalPalette.fromInt(
        DislikeAnalyzer.fixIfDisliked(new TemperatureCache(primaryHct).analogous(3, 6)[2]).toInt(),
      ),
      neutral: TonalPalette.fromHueAndChroma(primaryHct.hue, primaryHct.chroma / 8.0),
      neutralVariant: TonalPalette.fromHueAndChroma(primaryHct.hue, primaryHct.chroma / 8.0 + 4.0),
    };

    const setToken = (palette: TonalPalette, name: string, l: number, d: number): void => {
      const val = `light-dark(${hexFromArgb(palette.tone(l))}, ${hexFromArgb(palette.tone(d))})`;
      root.style.setProperty(`--mat-sys-${name}`, val);
    };

    setToken(palettes.primary, 'primary', 40, 80);
    setToken(palettes.primary, 'on-primary', 100, 20);
    setToken(palettes.primary, 'primary-container', 90, 30);
    setToken(palettes.primary, 'on-primary-container', 10, 90);
    setToken(palettes.primary, 'surface-tint', 40, 80);
    setToken(palettes.primary, 'inverse-primary', 80, 40);

    setToken(palettes.secondary, 'secondary', 40, 80);
    setToken(palettes.secondary, 'on-secondary', 100, 20);
    setToken(palettes.secondary, 'secondary-container', 90, 30);
    setToken(palettes.secondary, 'on-secondary-container', 10, 90);

    setToken(palettes.neutral, 'surface', 98, 6);
    setToken(palettes.neutral, 'on-surface', 10, 90);
    setToken(palettes.neutral, 'background', 98, 6);
    setToken(palettes.neutral, 'on-background', 10, 90);
    setToken(palettes.neutral, 'inverse-surface', 20, 90);
    setToken(palettes.neutral, 'inverse-on-surface', 95, 20);
    setToken(palettes.neutral, 'surface-container', 94, 12);
    setToken(palettes.neutral, 'surface-container-low', 96, 10);
    setToken(palettes.neutral, 'surface-container-high', 92, 17);

    setToken(palettes.neutralVariant, 'outline', 50, 60);
    setToken(palettes.neutralVariant, 'outline-variant', 80, 30);
    setToken(palettes.neutralVariant, 'surface-variant', 90, 30);
    setToken(palettes.neutralVariant, 'on-surface-variant', 30, 80);
  }
}
