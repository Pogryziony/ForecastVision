import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDailyWeatherComponent } from './location-daily-weather.component';

describe('LocationDailyWeatherComponent', () => {
  let component: LocationDailyWeatherComponent;
  let fixture: ComponentFixture<LocationDailyWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDailyWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationDailyWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
