import { Directive, Inject } from '@angular/core';

import { MaterialDashboardProService } from '../services';

@Directive({
  selector: '[nbMdpActivator]'
})
export class MdpActivatorDirective {

  constructor(mdp: MaterialDashboardProService) {
    setTimeout(() => {
      mdp.enablePerfectScrollbar();

      // initialize Material Dashboard Pro theme
      mdp.initMdp();

      // initialize sidebare minimization
      mdp.initMinimizeSidebar();
    });
  }

}
