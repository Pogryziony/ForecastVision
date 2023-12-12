import {Component, Input, OnChanges} from '@angular/core';
import {WeatherData} from "../../models/weather-data.interface";
import {WeatherInfo} from "../../models/weather-info.interface";
import {WeatherTimeUnit} from "../../enums/weather-time-unit.enum";
import moment from "moment";

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrl: './weather-tile.component.scss'
})
export class WeatherTileComponent implements OnChanges {

  @Input() data: WeatherData;
  @Input() timeUnit: WeatherTimeUnit;

  iconSrc: string;
  weather: WeatherInfo;
  isCurrent: boolean;

  ngOnChanges(): void {
    this.weather = this.data.weather[0];
    this.setIsCurrent();
    this.setIcon();
  }

  private setIcon(): void {
    const icon = this.weather.icon;
    if (icon) {
      this.iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
  }

  private setIsCurrent(): void {
    const now = moment();
    const date = moment.unix(this.data.dt);
    switch (this.timeUnit) {
      case WeatherTimeUnit.Daily:
        this.isCurrent = date.date() === now.date();
        break;
      case WeatherTimeUnit.Hourly:
        this.isCurrent = date.hour() === now.hour();
        break;
    }
  }

}
