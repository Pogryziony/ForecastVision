import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from "./components/search/search.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {CurrentLocationComponent} from "./components/current-location/current-location.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CurrentLocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
