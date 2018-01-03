import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStateComponent } from './booking-state.component';
import { BookingStatePipe } from './../pipes/booking-state.pipe';
import { LangService } from './../services/lang.service';
import { BookingState } from '../../models';

describe('BookingStateComponent', () => {
  let component: BookingStateComponent;
  let fixture: ComponentFixture<BookingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookingStateComponent,
        BookingStatePipe,
      ],
      providers: [
        LangService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStateComponent);
    component = fixture.componentInstance;
    component.booking = {
      startTime: new Date(),
      endTime: new Date(),
      state: BookingState.Active,
      owner: null,
      vehicle: null
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
