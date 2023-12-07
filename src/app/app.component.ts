import {Component} from '@angular/core';
import {OpenWeatherService} from "./services/open-weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private _openWeatherService: OpenWeatherService) {
  }

}
