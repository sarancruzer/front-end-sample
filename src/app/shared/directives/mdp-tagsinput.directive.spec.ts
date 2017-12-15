/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdpTagsinputDirective } from './mdp-tagsinput.directive';

@Component({
  template: `<input type="text" value="foo,bar" class=".tagsinput"/>`
})
class TestComponent { }

describe('MdpTagsinputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ MdpTagsinputDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should create an instance', () => {
    const des = fixture.debugElement.queryAll(By.directive(MdpTagsinputDirective));
    expect(des).toBeTruthy();
  });

});
