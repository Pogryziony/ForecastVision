import {WeatherInfo} from "./weather-info.interface";
import {TemperatureData} from "./temperature-data.interface";

export interface WeatherData {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number | TemperatureData;
  uvi: number;
  visibility: number;
  weather: WeatherInfo[]
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
