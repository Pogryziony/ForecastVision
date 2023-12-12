import {Pipe, PipeTransform} from '@angular/core';
import {TemperatureData} from "../models/temperature-data.interface";

@Pipe({
  name: 'temperatureValueExtractor'
})
export class TemperatureValueExtractorPipe implements PipeTransform {

  transform(value: number | TemperatureData): unknown {
    if (isNaN(+value)) {
      return (value as TemperatureData).day;
    }

    return value;
  }

}
