import { Injectable } from '@angular/core';

@Injectable()
export class NavbarFooterService {
  visibleNav: boolean;
  visibleFooter: boolean;

  constructor() { this.visibleNav = false; this.visibleFooter = false; }

  hide() { this.visibleNav = false; this.visibleFooter = false; }

  show() { this.visibleNav = true; this.visibleFooter = true; }

}