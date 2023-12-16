import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLayerSelectorComponent } from './map-layer-selector.component';

describe('MapLayerSelectorComponent', () => {
  let component: MapLayerSelectorComponent;
  let fixture: ComponentFixture<MapLayerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapLayerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapLayerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
