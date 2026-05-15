# angular-material-runtime-theme

Runtime theming for **Angular Material 3** applications. Generate Material Design 3 system color tokens from a single primary hex color and apply them without rebuilding stylesheets.

Built on Google's [Material Color Utilities](https://github.com/material-foundation/material-color-utilities). Tokens are written as CSS custom properties using the `light-dark()` function so light and dark appearances stay in sync when you toggle `color-scheme`.

## Requirements

- Angular **21+**
- Angular Material **21+** with an M3 theme configured via `mat.theme()` (see [Material theming guide](https://material.angular.dev/guide/theming))
- Your app must set `color-scheme` on `html` or `body` (`light`, `dark`, or `light dark`) so `light-dark()` tokens resolve correctly

## Installation

```bash
npm install angular-material-runtime-theme
# or
pnpm add angular-material-runtime-theme
```

## Setup

### 1. Configure Angular Material (build time)

In your global styles (for example `styles.scss`), include the Material theme mixin. The seed palette here is only a starting point — runtime tokens override the generated CSS variables.

```scss
@use "@angular/material" as mat;

html {
  @include mat.theme(
    (
      color: (),
      typography: Roboto,
      density: 0,
    )
  );
}

body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
  margin: 0;
}
```

### 2. Apply a runtime primary color

Inject `AngularMaterialRuntimeTheme` and call `setTheme()` with a hex color:

```typescript
import { Component, inject } from "@angular/core";
import { AngularMaterialRuntimeTheme } from "angular-material-runtime-theme";

@Component({
  selector: "app-root",
  template: `<router-outlet />`,
})
export class App {
  constructor() {
    inject(AngularMaterialRuntimeTheme).setTheme("#6750A4");
  }
}
```

`applyTheme()` sets `--mat-sys-*` variables on the root component host element.

### 3. Light and dark mode

Toggle `color-scheme` on a root element (typically `document.body`). The library stores each token as `light-dark(<light>, <dark>)`, so the correct tone is picked automatically:

```typescript
document.body.style.colorScheme = isDark ? "dark" : "light";
```

You can also use `color-scheme: light dark` in CSS to follow the user's system preference.

## How it works

1. Convert the primary hex to an **HCT** color.
2. Build tonal palettes for primary, tertiary (analogous accent), neutral, and neutral variant.
3. For each token, map light and dark tone values to `light-dark(<light>, <dark>)` and assign them on the root host via `element.style.setProperty('--mat-sys-…', value)`.

Angular Material components read these variables, so buttons, form fields, dialogs, and other M3 components pick up the new colors immediately.

## Demo

From the repository root:

```bash
pnpm start
```

Open [http://localhost:4200](http://localhost:4200) for a live showcase with a color picker, preset swatches, dark mode toggle, and many Material components.

## License

MIT
