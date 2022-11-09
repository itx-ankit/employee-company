import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormGenerateComponent } from 'src/app/shared/components/form-generate/form-generate.component';
import { CustomIconDirective } from 'src/app/shared/directive/customIcon/custom-icon.directive';
import { ButtonContainerComponent } from 'src/app/shared/components/button-container/button-container.component';
import { customButtonDirective } from 'src/app/shared/directive/customButton/c-btn.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

const matModules = [
  MatSidenavModule,
  MatCheckboxModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatSortModule,
];

@NgModule({
  declarations: [
    FormGenerateComponent,
    CustomIconDirective,
    ButtonContainerComponent,
    customButtonDirective,
  ],
  imports: [CommonModule, ...matModules],
  exports: [
    FormGenerateComponent,
    CustomIconDirective,
    ButtonContainerComponent,
    customButtonDirective,
    ...matModules,
  ],
})
export class SharedModule {}
