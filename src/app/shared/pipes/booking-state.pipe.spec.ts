import { LangService } from './../services/lang.service';
import { BookingStatePipe } from './booking-state.pipe';
import { BookingState } from './../../models';

describe('BookingStatePipe', () => {
  let lang: LangService;
  let pipe: BookingStatePipe;

  beforeEach(() => {
    lang = new LangService();
    pipe = new BookingStatePipe(lang);
  });

  it('should be creatable', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform to Draft', () => {
    spyOn(lang, 'get').and.returnValue('Draft');
    expect(pipe.transform(BookingState.Draft)).toEqual('Draft');
  });

  it('should transform to Active', () => {
    spyOn(lang, 'get').and.returnValue('Active');
    expect(pipe.transform(BookingState.Active)).toEqual('Active');
  });

  it('should transform to Cancelled', () => {
    spyOn(lang, 'get').and.returnValue('Cancelled');
    expect(pipe.transform(BookingState.Cancelled)).toEqual('Cancelled');
  });

  it('should transform to Completed', () => {
    spyOn(lang, 'get').and.returnValue('Completed');
    expect(pipe.transform(BookingState.Completed)).toEqual('Completed');
  });

  it('should transform to Unknown', () => {
    spyOn(lang, 'get').and.returnValue('Unknown');
    expect(pipe.transform(BookingState.Unknown)).toEqual('Unknown');
  });

  it('should default to Unknown', () => {
    spyOn(lang, 'get').and.returnValue('Unknown');
    expect(pipe.transform(42)).toEqual('Unknown');
  });
});
