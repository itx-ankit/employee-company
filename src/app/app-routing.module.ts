import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewCompanyComponent } from './shared/components/new-company/new-company.component';

const routes: Routes = [
  { path: '', component: NewCompanyComponent },
  { path: 'new_company', component: NewCompanyComponent },
  {
    path: 'company_list',
    loadChildren: () =>
      import('./Modules/companylist/companylist.module').then(
        (mod) => mod.CompanylistModule
      ),
  },
  { path: '**', component: ErrorPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
