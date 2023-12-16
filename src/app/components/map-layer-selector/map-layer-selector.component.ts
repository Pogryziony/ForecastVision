import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapLayerType} from "../../enums/map-layer-type";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-map-layer-selector',
  templateUrl: './map-layer-selector.component.html',
  styleUrl: './map-layer-selector.component.scss'
})
export class MapLayerSelectorComponent implements OnInit {

  @Output() onSelect: EventEmitter<MapLayerType>;
  @Output() onUnselect: EventEmitter<MapLayerType>;

  layers: string[];
  mapLayerType = MapLayerType;
  layerCaptions = {
    [MapLayerType.Clouds]: 'Clouds',
    [MapLayerType.Precipitation]: 'Precipitation',
    [MapLayerType.SeaLevelPressure]: 'Sea Level Pressure',
    [MapLayerType.Temperature]: 'Temperature',
    [MapLayerType.Wind]: 'Wind',
  }

  constructor() {
    this.onSelect = new EventEmitter<MapLayerType>();
    this.onUnselect = new EventEmitter<MapLayerType>();
  }

  ngOnInit(): void {
    this.layers = Object.keys(MapLayerType);
  }

  onChange(event: MatCheckboxChange, layer: string) {
    const layerType = MapLayerType[layer];
    if (event.checked) {
      this.onSelect.emit(layerType)
    } else {
      this.onUnselect.emit(layerType)
    }
  }
}
