import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { NavbarFooterService } from "../../shared/services/nav-bar-footer.service";
import { ToastrService } from "./../../shared/services/toastr.service";
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [EmailValidator]
})
export class ResetPasswordComponent implements OnInit {
  private token: any;
  user = {
    emailAddress: "",
    newPassword: ""
  };
  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    public navbarFooterService: NavbarFooterService,
    private router: Router,
  ) {
    navbarFooterService.show();
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  updatePassword(resetForm: NgForm) {
    console.log(resetForm);
    var data = {
      token: this.token,
      emailAddress: this.user.emailAddress,
      newPassword: this.user.newPassword
    }
    console.log(data);
    this.authService.resetPassword(data)
      .subscribe(data => {
        this.toastService.success("Update successful", "");
        this.router.navigate(["/login"]);
      }, err => {
        this.toastService.error("Error", "Update Fail");
      })
  }


}
