import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from "./components/search/search.component";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {CurrentLocationComponent} from "./components/current-location/current-location.component";
import {SearchResultComponent} from "./components/search-result/search-result.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LocationDailyWeatherComponent} from "./components/location-daily-weather/location-daily-weather.component";
import {TimestampToDatePipe} from "./pipes/timestamp-to-date.pipe";
import {WeatherTileComponent} from "./components/weather-tile/weather-tile.component";
import {TemperatureValueExtractorPipe} from "./pipes/temperature-value-extractor.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MapComponent} from "./components/map/map.component";
import {MapLayerSelectorComponent} from "./components/map-layer-selector/map-layer-selector.component";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CurrentLocationComponent,
    SearchResultComponent,
    LocationDailyWeatherComponent,
    WeatherTileComponent,
    TimestampToDatePipe,
    TemperatureValueExtractorPipe,
    MapComponent,
    MapLayerSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatCheckboxModule
  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
