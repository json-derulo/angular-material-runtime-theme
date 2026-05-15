import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AngularMaterialRuntimeTheme } from 'lib';

@Component({
  selector: 'app-root',
  imports: [MatButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(AngularMaterialRuntimeTheme).applyTheme('#6750A4');
  }
}
