import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }  from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackagesComponent } from './packages/packages.component';
import { PackagesListComponent } from './packages/packages-list/packages-list.component';
import { PackageComponent } from './packages/package/package.component';

@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    PackagesListComponent,
    PackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 1000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
