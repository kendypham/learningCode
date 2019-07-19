import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavbarFooterService } from 'src/app/shared/services/nav-bar-footer.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  isConfirm: any = false;
  tmpToken: any;
  private sub: any;
  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    public navbarFooterService: NavbarFooterService,
    private storageService: StorageService,
  ) {
    navbarFooterService.show();
  }

  ngOnInit() {
    this.tmpToken = this.storageService.getAccessToken();
    this.storageService.deleteTokenTmp();
    this.sub = this.route.params.subscribe((params) => {
      if (this.route.snapshot.queryParamMap.get("token") != null) {
        const token = this.route.snapshot.queryParamMap.get("token")
        console.log("token", token);
        this.confirmEmail(token);
      } else {
        this.toastService.warning("Please confirm your email first", "")
      }
    });
  }

  confirmEmail(token) {
    this.authService.confirmEmail(token)
      .subscribe(data => {
        this.toastService.success("Confirm email successful", "");
        this.isConfirm = true;
      }, err => {
        // this.toastService.error("Confirm email fail", "");
      })
  }

  requestConfirm(token) {
    this.authService.requestConfirmEmail(token)
      .subscribe(data => {
        this.toastService.success("Please check your mail to confirm", "");
      }, err => {
        this.toastService.error("Error", err.statusText);
      })
  }

}
