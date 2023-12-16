import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "../../services/open-weather.service";
import {LocationWeatherResponse} from "../../models/location-weather-response.interface";
import {WeatherTimeUnit} from "../../enums/weather-time-unit.enum";
import {WeatherData} from "../../models/weather-data.interface";

@Component({
  selector: 'app-location-daily-weather',
  templateUrl: './location-daily-weather.component.html',
  styleUrl: './location-daily-weather.component.scss'
})
export class LocationDailyWeatherComponent implements OnInit {

  weatherData: LocationWeatherResponse;
  options: WeatherTimeUnit[] = [
    WeatherTimeUnit.Daily,
    WeatherTimeUnit.Hourly
  ];
  timeUnit = WeatherTimeUnit.Daily;
  weatherDataToDisplay: WeatherData[];

  constructor(private _openWeatherService: OpenWeatherService) {
  }

  ngOnInit(): void {
    this._openWeatherService.getLocationWeatherData().subscribe((response: LocationWeatherResponse) => {
        this.weatherData = response;
        this.onSelectionChange();
      }
    );
  }

  onSelectionChange(): void {
    switch (this.timeUnit) {
      case WeatherTimeUnit.Daily:
        this.weatherDataToDisplay = this.weatherData.daily;
        break;
      case WeatherTimeUnit.Hourly:
        this.weatherDataToDisplay = this.weatherData.hourly.slice(0, 24)
    }
  }

}
