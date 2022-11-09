import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGenrateComponent } from 'src/app/shared/components/table-genrate/table-genrate.component';

const routes: Routes = [{ path: '', component: TableGenrateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanylistRoutingModule {}
