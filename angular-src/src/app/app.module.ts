import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// User defined modules

// User defined components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArtsGridModule } from './arts-grid/arts-grid.module';
import { CloseUpModule } from './close-up/close-up.module';
import { HeaderModule } from './header/header.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,

    // User declared modules
    AppRoutingModule,

    ArtsGridModule,

    CloseUpModule,

    HeaderModule,

    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
