import { Component, inject } from '@angular/core';
import { AngularMaterialRuntimeTheme } from 'lib-dist';

@Component({
  selector: 'app-root',
  template: '<h1>Test</h1>',
})
export class AppComponent {
  private theme = inject(AngularMaterialRuntimeTheme);

  constructor() {
    this.theme.setTheme({ primary: '#6750A4' });
  }
}
