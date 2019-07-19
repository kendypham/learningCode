import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { SpinnerOverlayAdminComponent } from './spinner-overlay-admin.component';
import { SpinnerOverlayAdminService } from './spinner-overlay-admin.service';

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [SpinnerOverlayAdminComponent],
  entryComponents: [SpinnerOverlayAdminComponent],
  providers: [SpinnerOverlayAdminService],
  exports: []
})
export class SpinnerOverlayAdminModule { }
