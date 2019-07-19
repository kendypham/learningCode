/* tslint:disable:no-unused-variable */

import { Overlay } from '@angular/cdk/overlay';
import { inject, TestBed } from '@angular/core/testing';
import { SpinnerOverlayAdminService } from './spinner-overlay-admin.service';


describe('Service: SpinnerOverlayAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerOverlayAdminService, Overlay]
    });
  });

  it(
    'should ...',
    inject([SpinnerOverlayAdminService], (service: SpinnerOverlayAdminService) => {
      expect(service).toBeTruthy();
    })
  );
});
