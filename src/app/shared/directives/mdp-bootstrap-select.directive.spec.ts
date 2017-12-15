/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { MdpBootstrapSelectDirective } from './mdp-bootstrap-select.directive';

describe('MdpBootstrapSelectDirective', () => {

  it('should create an instance', () => {
    let el = new ElementRef({});
    let directive = new MdpBootstrapSelectDirective(el);
    expect(directive).toBeTruthy();
  });

});
