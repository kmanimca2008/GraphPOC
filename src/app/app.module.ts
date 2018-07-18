import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KlComponent, KlComponents, KlComponentsService } from './vendor/angular-keylines';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

export const VENDOR_GRAPH_COMPONENTS = [
  KlComponent,
  KlComponents
];

@NgModule({
  declarations: [
    AppComponent,
    VENDOR_GRAPH_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [KlComponentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
