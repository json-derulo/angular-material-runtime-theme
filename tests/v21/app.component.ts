import { Component, inject } from '@angular/core';
import { AngularMaterialRuntimeTheme } from 'lib';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1>Test</h1>',
})
export class AppComponent {
  private theme = inject(AngularMaterialRuntimeTheme);

  constructor() {
    this.theme.setTheme({ primary: '#6750A4' });
  }
}
