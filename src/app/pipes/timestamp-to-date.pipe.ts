import {Pipe, PipeTransform} from '@angular/core';
import moment from "moment";
import {WeatherTimeUnit} from "../enums/weather-time-unit.enum";

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: number, timeUnit: WeatherTimeUnit): unknown {
    switch (timeUnit) {
      case WeatherTimeUnit.Daily:
        return moment.unix(value).format("DD");
      case WeatherTimeUnit.Hourly:
        return moment.unix(value).format("HH:mm");
    }
  }

}
