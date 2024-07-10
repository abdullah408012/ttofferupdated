import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './pages/header/header.component';
import { BodyComponent } from './pages/body/body.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule, 
      GoogleMapsModule,
      MatDatepickerModule,
      MatInputModule,
      MatNativeDateModule,
      MatFormFieldModule,
      NgxMaterialTimepickerModule,
      BrowserAnimationsModule,
      // MatProgressSpinnerModule
    ),
    provideRouter([
      // { path: '', component: BodyComponent },
      // { path: '', component: HeaderComponent },
      
    ]), provideAnimationsAsync()
  ]
};
