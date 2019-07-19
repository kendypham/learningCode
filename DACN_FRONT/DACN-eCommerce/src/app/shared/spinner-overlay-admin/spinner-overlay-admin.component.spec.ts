/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerOverlayAdminComponent } from './spinner-overlay-admin.component';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('SpinnerOverlayAdminComponent', () => {
  let component: SpinnerOverlayAdminComponent;
  let fixture: ComponentFixture<SpinnerOverlayAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerOverlayAdminComponent, SpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerOverlayAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
