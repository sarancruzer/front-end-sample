import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopupComponent } from './confirm-popup.component';

describe('ConfirmPopupComponent', () => {
  let component: ConfirmPopupComponent;
  let fixture: ComponentFixture<ConfirmPopupComponent>;
  let appendToSpy: jasmine.Spy;
  let modalSpy: jasmine.Spy;

  beforeEach(async(() => {
    appendToSpy = spyOn($.fn, 'appendTo');
    modalSpy = spyOn($.fn, 'modal');

    TestBed.configureTestingModule({
      declarations: [ ConfirmPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupComponent);
    component = fixture.componentInstance;
    component.title = 'Foo';
    component.message = 'Do you really like foo?';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize jQuery modal', () => {
    expect(appendToSpy).toHaveBeenCalledWith('body');
  });

  it('should be able to show the modal', () => {
    component.show();
    expect(modalSpy).toHaveBeenCalledWith({ show: true, backdrop: 'static' });
  });

  it('should be able to hide the modal', () => {
    component.hide();
    expect(modalSpy).toHaveBeenCalledWith('hide');
  });

  it('should hide the modal and emit the corresponding event when it is confirmed', () => {
    const callback = jasmine.createSpy('onConfirmSpy');
    component.onConfirm.subscribe(callback);
    component.confirm();
    expect(callback).toHaveBeenCalled();
    expect(modalSpy).toHaveBeenCalledWith('hide');
  });

  it('should hide the modal and emit the corresponding event when it is cancelled', () => {
    const callback = jasmine.createSpy('onCancelSpy');
    component.onCancel.subscribe(callback);
    component.cancel();
    expect(callback).toHaveBeenCalled();
    expect(modalSpy).toHaveBeenCalledWith('hide');
  });

  it('should hide the modal when close button is clicked', () => {
    const closeBtn = fixture.debugElement.query(By.css('.close'));
    closeBtn.nativeElement.click();
    expect(modalSpy).toHaveBeenCalledWith('hide');
  });

  it('should display the title as the title of the modal', () => {
    const h4 = fixture.debugElement.query(By.css('.modal-title'));
    expect(h4.nativeElement.textContent).toContain(component.title);
  });

  it('should display the message in the body of the modal', () => {
    const modalBody = fixture.debugElement.query(By.css('.modal-body'));
    expect(modalBody.nativeElement.textContent).toContain(component.message);
  });
});
