import {Component, OnInit} from '@angular/core';
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {Feature, View} from "ol";
import OpenLayersMap from 'ol/Map';
import {OpenWeatherService} from "../../services/open-weather.service";
import {MapLayerType} from "../../enums/map-layer-type";
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {LocationData} from "../../models/location-data.interface";
import {transform} from "ol/proj";
import {Icon, Style} from "ol/style";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  map: OpenLayersMap;

  private _layers: Map<MapLayerType, TileLayer<any>>
  private _feature: Feature;

  constructor(private _openWeatherService: OpenWeatherService) {
    this._layers = new Map<MapLayerType, TileLayer<any>>();
  }

  ngOnInit(): void {
    const defaultLayer = this.createDefaultLayer();
    this.fillLayers();
    this.createMap(defaultLayer);
    this._openWeatherService.getCurrentLocation().subscribe((location: LocationData) => {
      const view = this.map.getView();
      const coordinates = transform([location.lon, location.lat], 'EPSG:4326', 'EPSG:3857');
      this._feature.setGeometry(new Point(coordinates))
      view.setCenter(coordinates);
    })
  }

  onSelectLayer(layerType: MapLayerType): void {
    const layer = this._layers.get(layerType);
    this.map.addLayer(layer);
  }

  onUnselectLayer(layerType: MapLayerType): void {
    const layer = this._layers.get(layerType);
    this.map.removeLayer(layer);
  }

  private fillLayers(): void {
    const keys = Object.keys(MapLayerType);
    keys.forEach((key: string) => {
      const layerType = MapLayerType[key];
      const layer = this._openWeatherService.getMapLayer(layerType);
      this._layers.set(layerType, layer);
    })
  }

  private createDefaultLayer(): TileLayer<any> {
    return new TileLayer({
      source: new OSM(),
    });
  }

  private createMap(defaultLayer: TileLayer<any>): void {
    const pin = this.createPin();
    this.map = new OpenLayersMap({
      layers: [
        defaultLayer,
        pin
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 12,
        maxZoom: 20
      }),
    });
  }

  private createPin(): VectorLayer<any> {
    this._feature = new Feature();
    return new VectorLayer({
      source: new VectorSource({
        features: [this._feature],
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'assets/pin.svg',
        }),
      }),
    })
  }

}
