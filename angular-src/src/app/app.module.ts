import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// User defined modules

// User defined components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArtsGridModule } from './gallery/arts-grid/arts-grid.module';
import { CloseUpModule } from './gallery/close-up/close-up.module';
import { HeaderModule } from './gallery/header/header.module';
import { GalleryModule } from './gallery/gallery.module';

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
    GalleryModule,
    AppRoutingModule,
    ArtsGridModule,
    CloseUpModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
