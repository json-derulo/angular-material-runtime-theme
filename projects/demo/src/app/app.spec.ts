import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS, provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { AngularMaterialRuntimeTheme } from 'lib';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './app';

describe('App', () => {
  let setTheme: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    setTheme = vi.fn().mockResolvedValue(undefined);
    document.body.style.colorScheme = '';

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideNativeDateAdapter(),
        { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } },
        { provide: AngularMaterialRuntimeTheme, useValue: { setTheme } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the demo title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular Material Runtime Theme');
  });

  it('should apply the default primary color on init', async () => {
    TestBed.createComponent(App);
    await vi.waitFor(() => {
      expect(setTheme).toHaveBeenCalledWith({ primary: '#6750A4' });
    });
  });

  it('should update color scheme when dark mode is toggled', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const document = TestBed.inject(DOCUMENT);
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'))
      .componentInstance as MatSlideToggle;

    expect(document.body.style.colorScheme).toBe('light');

    toggle.change.emit({ source: toggle, checked: true });
    await fixture.whenStable();

    expect(document.body.style.colorScheme).toBe('dark');
  });

  it('should apply theme when a preset color is selected', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    setTheme.mockClear();

    const preset = fixture.nativeElement.querySelector(
      '.preset-swatch[aria-label="Teal"]',
    ) as HTMLButtonElement;
    preset.click();
    await fixture.whenStable();

    await vi.waitFor(() => {
      expect(setTheme).toHaveBeenCalledWith({ primary: '#006874' });
    });
  });
});
