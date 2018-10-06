import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// User defined modules
import { ContentModule } from './content/content.module';

// User defined components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // User declared modules
    ContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
