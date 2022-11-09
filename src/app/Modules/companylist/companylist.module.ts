import { NgModule } from '@angular/core';
import { CompanylistRoutingModule } from './companylist-routing.module';
import { TableGenrateComponent } from 'src/app/shared/components/table-genrate/table-genrate.component';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: [TableGenrateComponent],
  imports: [CompanylistRoutingModule, SharedModule],
})
export class CompanylistModule {}
