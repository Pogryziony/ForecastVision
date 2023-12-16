import {WeatherData} from "./weather-data.interface";

export interface LocationWeatherResponse {
  current: WeatherData;
  daily: WeatherData[];
  hourly: WeatherData[];
}
