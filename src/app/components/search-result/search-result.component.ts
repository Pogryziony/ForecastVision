import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocationData} from "../../models/location-data.interface";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  @Input() location: LocationData;

}
