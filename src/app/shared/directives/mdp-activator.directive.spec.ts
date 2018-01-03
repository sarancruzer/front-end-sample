/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { MdpActivatorDirective } from './mdp-activator.directive';
import {
  MaterialDashboardProService,
  WindowRefService,
} from '../services';

describe('MdpPerfectScrollbarDirective', () => {
  let mdp: MaterialDashboardProService;

  beforeEach(() => {
    const windowRef = new WindowRefService();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'enablePerfectScrollbar');
    spyOn(mdp, 'initMdp');
    spyOn(mdp, 'isWindows').and.returnValue(false);
  });

  it('should create an instance', () => {
    const directive = new MdpActivatorDirective(mdp);
    expect(directive).toBeTruthy();
  });

});
