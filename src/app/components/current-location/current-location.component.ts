import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "../../services/open-weather.service";
import {LocationData} from "../../models/location-data.interface";

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrl: './current-location.component.scss'
})
export class CurrentLocationComponent implements OnInit {

  currentLocation: LocationData;

  constructor(private _openWeatherService: OpenWeatherService) {
  }

  ngOnInit(): void {
    this._openWeatherService.getCurrentLocation().subscribe(
      (currentLocation: LocationData) => {
        this.currentLocation = currentLocation
      }
    )
  }

}
