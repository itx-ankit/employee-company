import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { NewCompanyComponent } from './shared/components/new-company/new-company.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Modules/Shared/shared.module';
@NgModule({
  declarations: [AppComponent, SideNavComponent, NewCompanyComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
