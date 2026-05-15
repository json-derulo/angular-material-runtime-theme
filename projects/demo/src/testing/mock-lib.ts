import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AngularMaterialRuntimeTheme {
  async setTheme(_theme: { primary: string }): Promise<void> {
    return undefined;
  }
}
