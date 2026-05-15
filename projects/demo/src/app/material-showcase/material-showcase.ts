import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipSet, MatChipOption } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

import { DemoDialog } from './demo-dialog';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const TABLE_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
];

@Component({
  selector: 'app-material-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatBadge,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatChipOption,
    MatChipSet,
    MatColumnDef,
    MatDatepickerModule,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFabButton,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInputModule,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatMiniFabButton,
    MatNavList,
    MatOption,
    MatProgressBar,
    MatProgressSpinner,
    MatRadioButton,
    MatRadioGroup,
    MatRow,
    MatRowDef,
    MatSelect,
    MatSlideToggle,
    MatSlider,
    MatSliderThumb,
    MatStep,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    MatTab,
    MatTabGroup,
    MatTable,
    MatTooltip,
    MatAccordion,
  ],
  templateUrl: './material-showcase.html',
  styleUrl: './material-showcase.scss',
})
export class MaterialShowcase {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly tableColumns = ['position', 'name', 'weight', 'symbol'];
  protected readonly tableData = new MatTableDataSource(TABLE_DATA);
  protected readonly basicInputControl = new FormControl('', Validators.required);
  protected readonly fruitControl = new FormControl('apple');
  protected readonly birthdateControl = new FormControl<Date | null>(new Date(2026, 4, 15));
  protected readonly sliderValue = signal(42);
  protected readonly progressValue = signal(65);
  protected readonly layoutView = signal<'list' | 'grid'>('list');

  protected openDialog(): void {
    this.dialog.open(DemoDialog, { width: '24rem' });
  }

  protected openSnackBar(): void {
    this.snackBar.open('Theme tokens apply to overlays too.', 'Dismiss', { duration: 3500 });
  }
}
