import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, firstValueFrom, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "../models/search-response.interface";
import {LocationData} from "../models/location-data.interface";
import {LocationWeatherResponse} from "../models/location-weather-response.interface";
import moment from "moment";
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private static readonly API_KEY = '0223096a1ab52c25bc99dad2151991a9';

  private _searchSubject = new Subject<string>();
  private _locations = new Subject<SearchResponse>();
  private _locationWeatherData = new Subject<LocationWeatherResponse>();
  private _currentLocation = new BehaviorSubject<LocationData>(null);

  constructor(private _http: HttpClient) {
    this._searchSubject
      .pipe(
        debounceTime(300)
      )
      .subscribe(this.requestLocations.bind(this));
  }

  search(query: string): void {
    if (query.length > 0) {
      this._searchSubject.next(query);
    }
  }

  updateCurrentLocation(location: LocationData): void {
    this.requestDailyWeather(location);
    this._currentLocation.next(location);
  }

  getCurrentLocation(): Observable<LocationData> {
    return this._currentLocation.asObservable();
  }

  getLocationWeatherData(): Observable<LocationWeatherResponse> {
    return this._locationWeatherData.asObservable();
  }

  getLocations(): Observable<SearchResponse> {
    return this._locations.asObservable();
  }

  requestLocations(query: string, limit: number = 10): void {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${OpenWeatherService.API_KEY}`;
    this._http.get<any>(endpoint).subscribe((response: any) => {
      this._locations.next({
        locations: response
      })
    });
  }

  getMapLayer(layer: string): TileLayer<any> {
    const mapUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${OpenWeatherService.API_KEY}`
    return new TileLayer({
      source: new XYZ({
        url: mapUrl
      }),
    })
  }

  async requestDailyWeather(location: LocationData): Promise<void> {
    const [
      fiveDaysAgo,
      fourDaysAgo,
      threeDaysAgo,
      twoDaysAgo,
      yesterday,
      now
    ] = await Promise.all([
      this.requestHistoricalWeatherData(location, 5),
      this.requestHistoricalWeatherData(location, 4),
      this.requestHistoricalWeatherData(location, 3),
      this.requestHistoricalWeatherData(location, 2),
      this.requestHistoricalWeatherData(location, 1),
      this.requestWeatherData(location)
    ]);
    now.daily.unshift(...[
      fiveDaysAgo.current,
      fourDaysAgo.current,
      threeDaysAgo.current,
      twoDaysAgo.current,
      yesterday.current,
    ])
    this._locationWeatherData.next(now);
  }

  private requestWeatherData(location: LocationData): Promise<any> {
    const endpoint = `http://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OpenWeatherService.API_KEY}`;
    return firstValueFrom(this._http.get<any>(endpoint));
  }

  private requestHistoricalWeatherData(location: LocationData, numberOfDays: number): Promise<any> {
    const now = moment();
    const pastDate = now.subtract(numberOfDays, 'days');
    const dt = Math.floor(pastDate.valueOf() / 1000);
    const endpoint = `http://api.openweathermap.org/data/2.5/onecall/timemachine?dt=${dt}&lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OpenWeatherService.API_KEY}`;

    return firstValueFrom(this._http.get<any>(endpoint));
  }

}
