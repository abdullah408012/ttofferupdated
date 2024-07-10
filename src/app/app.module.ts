import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { HeaderComponent } from './pages/header/header.component';
// import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    // HeaderComponent,
  ],
  imports: [
    CommonModule,
    // HttpClient
  ],
  exports: [
    // HeaderComponent
  ],
  providers:[
    provideHttpClient(
      withFetch(),
    ),
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
