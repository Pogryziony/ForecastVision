import {Injectable} from '@angular/core';
import {IpInfoResponse} from "../models/ip-info-response.interface";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OpenWeatherService} from "./open-weather.service";

@Injectable({
  providedIn: 'root'
})
export class IpInfoService {

  private static readonly IP_INFO_URL = 'https://ipinfo.io';
  private static readonly TOKEN = '3862191d4d7728';

  constructor(private _http: HttpClient, private _openWeatherService: OpenWeatherService) {
  }

  getCurrentLocationWeather(): void {
    firstValueFrom(this._http.get<IpInfoResponse>(`${IpInfoService.IP_INFO_URL}/json?token=${IpInfoService.TOKEN}`))
      .then((response: IpInfoResponse) => this._openWeatherService.requestLocations(response.city, 1));
  }
}
