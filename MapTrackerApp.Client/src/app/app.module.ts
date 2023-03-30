import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule }  from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackagesComponent } from './packages/packages.component';
import { PackagesListComponent } from './packages/packages-list/packages-list.component';
import { PackageComponent } from './packages/package/package.component';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CDBFreeModule, InputModule, NavbarModule, SidebarModule } from 'ng-cdbangular';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    PackagesListComponent,
    PackageComponent,
    MapComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
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
    NgxMapLibreGLModule,
    GoogleMapsModule,
    SidebarModule,
    NavbarModule,
    InputModule,
    NavbarModule,
    CDBFreeModule,
    NgxBootstrapIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
