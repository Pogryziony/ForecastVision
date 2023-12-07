import {Component, OnInit} from '@angular/core';
import {SearchResponse} from "../../models/search-response.interface";
import {OpenWeatherService} from "../../services/open-weather.service";
import {IpInfoService} from "../../services/ip-info.service";

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrl: './current-location.component.scss'
})
export class CurrentLocationComponent implements OnInit {

  searchResponse: SearchResponse;

  constructor(
    private _openWeatherService: OpenWeatherService,
    private _ipInfoService: IpInfoService
  ) {
  }

  ngOnInit(): void {
    this._openWeatherService.getLocations()
      .subscribe((response: SearchResponse) => this.searchResponse = response)
    this._ipInfoService.getCurrentLocationWeather();
  }

}
