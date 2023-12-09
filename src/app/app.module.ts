import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from "./components/search/search.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {CurrentLocationComponent} from "./components/current-location/current-location.component";
import {SearchResultComponent} from "./components/search-result/search-result.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CurrentLocationComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
