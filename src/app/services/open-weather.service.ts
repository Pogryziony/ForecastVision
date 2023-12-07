import {Injectable} from '@angular/core';
import {debounceTime, map, Observable, Subject, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "../models/search-response.interface";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private static readonly API_KEY = '0223096a1ab52c25bc99dad2151991a9';

  private _searchSubject = new Subject<string>();
  private _locations = new Subject<SearchResponse>();

  constructor(private _http: HttpClient) {
    this._searchSubject
      .pipe(
        debounceTime(300)
      )
      .subscribe(this.requestLocations.bind(this));
  }

  search(query: string): void {
    this._searchSubject.next(query);
  }

  getLocations(): Observable<SearchResponse> {
    return this._locations.asObservable();
  }

  requestLocations(query: string): void {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&lang=pl&appid=${OpenWeatherService.API_KEY}`;
    this._http.get<SearchResponse>(endpoint).pipe(
      map((data: any) => data[0])
    ).subscribe((response: SearchResponse) => this._locations.next(response));
  }

}
