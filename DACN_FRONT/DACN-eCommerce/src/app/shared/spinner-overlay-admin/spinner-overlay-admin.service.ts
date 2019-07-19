import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayAdminComponent } from './spinner-overlay-admin.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayAdminService {

  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) { }

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const SpinnerOverlayAdminPortal = new ComponentPortal(SpinnerOverlayAdminComponent);

    // run in async context for triggering "tick", thus avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      const component = this.overlayRef.attach(SpinnerOverlayAdminPortal); // Attach ComponentPortal to PortalHost

      // TODO: set message
      component.instance.message = message;
    });
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
