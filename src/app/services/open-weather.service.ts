import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "../models/search-response.interface";
import {LocationData} from "../models/location-data.interface";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private static readonly API_KEY = '0223096a1ab52c25bc99dad2151991a9';

  private _searchSubject = new Subject<string>();
  private _locations = new Subject<SearchResponse>();
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
    this._currentLocation.next(location);
  }

  getCurrentLocation(): Observable<LocationData> {
    return this._currentLocation.asObservable();
  }

  getLocations(): Observable<SearchResponse> {
    return this._locations.asObservable();
  }

  requestLocations(query: string, limit: number = 10): void {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&lang=pl&appid=${OpenWeatherService.API_KEY}`;
    this._http.get<any>(endpoint).subscribe((response: any) => {
      this._locations.next({
        locations: response
      })
    });
  }

}
