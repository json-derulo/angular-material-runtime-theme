import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { AppComponent } from './app.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Compatibility Test', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should set the CSS variables on documentElement', () => {
    const primary = document.documentElement.style.getPropertyValue('--mat-sys-primary');
    // The library uses light-dark(), we just check if it's set and has some expected content
    expect(primary).toContain('light-dark');
  });
});
