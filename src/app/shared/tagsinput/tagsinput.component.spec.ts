/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MdpTagsinputDirective } from './../directives';
import { Tag } from './../../models';
import { TagsinputComponent } from './tagsinput.component';

describe('TagsinputComponent', () => {
  let component: TagsinputComponent;
  let fixture: ComponentFixture<TagsinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the value of the input', () => {
    component.tags = [
      {value: 'Foo'},
      {value: 'Bar'}
    ];
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('.tagsinput'));
    expect(input.nativeElement.value).toEqual('Foo,Bar');
  });

  it('should reconcile changes when saved', () => {
    component.tags = [
      {value: 'Foo'},
      {value: 'Bar'}
    ];
    let input = fixture.debugElement.query(By.css('.tagsinput'));
    let directive = new MdpTagsinputDirective(input);
    directive.element = [{
      items: () => ['Bar', 'Buzz'] // remove `Foo` and add `Buzz`
    }];
    component.input = directive;
    fixture.detectChanges();

    // trigger save
    component.save();
    expect(component.tags).toEqual([{value: 'Bar'}, {value: 'Buzz'}]);
  });

  it('should emit updated event when saved', () => {
    let updatedTags: Tag[] = [];
    component.updated.subscribe(tags => updatedTags = tags);
    component.tags = [
      {value: 'Foo'},
      {value: 'Bar'}
    ];
    let input = fixture.debugElement.query(By.css('.tagsinput'));
    let directive = new MdpTagsinputDirective(input);
    directive.element = [{
      items: () => ['Bar', 'Buzz'] // remove `Foo` and add `Buzz`
    }];
    component.input = directive;
    fixture.detectChanges();

    // trigger save
    component.save();
    expect(updatedTags).toEqual(component.tags);
  });
});
