import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AngularMaterialRuntimeTheme } from './theme-service';

const LIGHT_HEX = '#aabbcc';
const DARK_HEX = '#112233';

vi.mock('@material/material-color-utilities', () => {
  const palette = {
    tone: (value: number) => (value < 50 ? 0xffaabbcc : 0xff112233),
  };

  return {
    argbFromHex: vi.fn(() => 0xff6750a4),
    Hct: {
      fromInt: vi.fn(() => ({ hue: 270, chroma: 20 })),
    },
    hexFromArgb: vi.fn((argb: number) => (argb === 0xffaabbcc ? LIGHT_HEX : DARK_HEX)),
    DislikeAnalyzer: {
      fixIfDisliked: (color: unknown) => color,
    },
    TemperatureCache: class {
      analogous() {
        return [
          { toInt: () => 0xff000001 },
          { toInt: () => 0xff000002 },
          { toInt: () => 0xff00ff00 },
        ];
      }
    },
    TonalPalette: {
      fromHct: vi.fn(() => palette),
      fromInt: vi.fn(() => palette),
      fromHueAndChroma: vi.fn(() => palette),
    },
  };
});

describe('AngularMaterialRuntimeTheme', () => {
  let service: AngularMaterialRuntimeTheme;

  beforeEach(() => {
    document.documentElement.style.cssText = '';
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMaterialRuntimeTheme);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Material system tokens on the document element', () => {
    service.setTheme({ primary: '#6750A4' });

    const primary = document.documentElement.style.getPropertyValue('--mat-sys-primary');
    expect(primary).toBe(`light-dark(${LIGHT_HEX}, ${DARK_HEX})`);
  });

  it('should set primary, surface, and outline tokens', () => {
    service.setTheme({ primary: '#006874' });

    const root = document.documentElement.style;
    const tokenNames = [
      '--mat-sys-primary',
      '--mat-sys-on-primary',
      '--mat-sys-surface',
      '--mat-sys-on-surface',
      '--mat-sys-outline',
      '--mat-sys-outline-variant',
    ];

    for (const name of tokenNames) {
      const value = root.getPropertyValue(name);
      expect(value, name).toMatch(/^light-dark\(.+, .+\)$/);
    }
  });

  it('should replace tokens when setTheme is called again', () => {
    service.setTheme({ primary: '#6750A4' });
    service.setTheme({ primary: '#984061' });

    const primary = document.documentElement.style.getPropertyValue('--mat-sys-primary');
    expect(primary).toBe(`light-dark(${LIGHT_HEX}, ${DARK_HEX})`);
  });
});
