import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay-admin',
  templateUrl: './spinner-overlay-admin.component.html',
  styleUrls: ['./spinner-overlay-admin.component.scss']
})
export class SpinnerOverlayAdminComponent implements OnInit {
  @Input() public message: string;
  constructor() { }

  public ngOnInit() { }
}
