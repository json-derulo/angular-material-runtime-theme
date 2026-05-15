# Angular Material Runtime Theme

Monorepo for **angular-material-runtime-theme** — runtime Material Design 3 theming for Angular Material apps.

Change the primary brand color at runtime (user settings, white-labeling, accessibility themes) without recompiling Sass. The library derives M3 system tokens from one hex value using [Material Color Utilities](https://github.com/material-foundation/material-color-utilities).

## Projects

| Project                          | Description                                         |
| -------------------------------- | --------------------------------------------------- |
| [`projects/lib`](projects/lib)   | Publishable library (`AngularMaterialRuntimeTheme`) |
| [`projects/demo`](projects/demo) | Interactive showcase application                    |

## Quick start

```bash
pnpm install
pnpm start
```

Visit [http://localhost:4200](http://localhost:4200) to explore the demo: color picker, preset palettes, light/dark mode, and a broad set of Angular Material components.

## Build

```bash
pnpm run build:lib   # library → dist/
pnpm run build:demo  # demo app
pnpm run build       # both
```

## Documentation

Full installation, setup, API reference, and theming notes:

**[projects/lib/README.md](projects/lib/README.md)**

## Development

```bash
pnpm test
pnpm lint
pnpm format
```

## Stack

- Angular
- Angular Material (M3)
- Material Color Utilities
