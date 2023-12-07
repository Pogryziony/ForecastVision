import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "../../services/open-weather.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  inputValue: string;

  constructor(private _openWeatherService: OpenWeatherService) {
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._openWeatherService.search(target.value);
  }

}
