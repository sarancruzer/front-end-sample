import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  LangService,
  StatisticsService,
  NotificationService,
  ChartistService,
} from './../../services';
import { ChartBasedStatsComponent } from './chart-based-stats.component';

import { StatisticsServiceStub } from './../../../../testing/nb-stubs';

describe('ChartBasedStatsComponent', () => {
  let component: ChartBasedStatsComponent;
  let fixture: ComponentFixture<ChartBasedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBasedStatsComponent ],
      providers: [
        LangService,
        NotificationService,
        { provide: StatisticsService, useClass: StatisticsServiceStub },
        ChartistService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBasedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
