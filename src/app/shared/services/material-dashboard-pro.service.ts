import { Injectable, Inject } from '@angular/core';

import { WindowRefService } from './window-ref.service';

@Injectable()
export class MaterialDashboardProService {

  window: Window;

  psContainers: any;

  constructor(
    windowRef: WindowRefService
  ) {
    this.window = windowRef.nativeWindow;
  }

  isWindows(): boolean {
    const platform = this.window.navigator.platform;
    return platform.indexOf('Win') > -1 ? true : false;
  }

  enablePerfectScrollbar() {
    if (this.isWindows() && !$('body').hasClass('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function
      const elements: any = $('.sidebar .sidebar-wrapper, .main-panel');
      this.psContainers = elements.perfectScrollbar();

      $('html').addClass('perfect-scrollbar-on');
    } else {
      $('html').addClass('perfect-scrollbar-off');
    }
  }

  initMdp() {
    (<any>$).material.init();
  }

  initMinimizeSidebar() {
    const md = <any>this.window['md'];
    if (md) {
      md.initMinimizeSidebar();
    }
  }

  /**
   * @TODO refactor to a directive
   */
  unwrapModals() {
    $('.modal').appendTo('body');
  }

  /**
   * @TODO refactor to a directive
   */
  activateTooltips() {
    (<any>$('[rel="tooltip"]')).tooltip();
  }

  scrollToTop() {
    if (this.psContainers) {
      this.psContainers.scrollTop(0);
      this.psContainers.perfectScrollbar('update');
    }

    this.window.scrollTo(0, 0);
  }
}
