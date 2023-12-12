import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "./services/open-weather.service";
import {filter, firstValueFrom} from "rxjs";
import {IpInfoService} from "./services/ip-info.service";
import {SearchResponse} from "./models/search-response.interface";
import {LocationData} from "./models/location-data.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  initialized = false;

  constructor(
    private _openWeatherService: OpenWeatherService,
    private _ipInfoService: IpInfoService
  ) {
  }

  ngOnInit(): void {
    this._openWeatherService.getLocations().subscribe((response: SearchResponse) => {

      if (response.locations.length === 1) {
        this._openWeatherService.updateCurrentLocation(response.locations[0]);
      }
    })
    firstValueFrom(this._openWeatherService.getCurrentLocation().pipe(
      filter((location: LocationData) => location != null)
    )).then(() => {
      this.initialized = true;
    })
    this._ipInfoService.getCurrentLocationWeather();
  }

}
