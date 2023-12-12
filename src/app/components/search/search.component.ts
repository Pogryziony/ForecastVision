import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "../../services/open-weather.service";
import {SearchResponse} from "../../models/search-response.interface";
import {LocationData} from "../../models/location-data.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  inputValue: string;
  shouldExpand: boolean;
  locations: LocationData[]

  constructor(private _openWeatherService: OpenWeatherService) {
  }

  ngOnInit(): void {
    this._openWeatherService.getLocations().subscribe((response: SearchResponse) => {
      this.shouldExpand = response.locations.length > 1
      this.locations = response.locations;
    })
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._openWeatherService.search(target.value);
  }

  onClick(location: LocationData): void {
    this._openWeatherService.updateCurrentLocation(location);
    this.shouldExpand = false;
  }

  onMaskClick(): void {
    this.shouldExpand = false;
  }

  onSearchClick(): void {
    if (this.locations.length > 1) {
      this.shouldExpand = true;
    }
  }

}
