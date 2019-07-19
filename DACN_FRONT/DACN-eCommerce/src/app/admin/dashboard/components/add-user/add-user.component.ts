import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { User, UserDetail } from 'src/app/shared/models/user';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { SpinnerOverlayService } from "src/app/shared/spinner-overlay/spinner-overlay.service";
import { AuthService } from './../../../../shared/services/auth.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [EmailValidator]
})
export class AddUserComponent implements OnInit {
  createUser;
  createUserDetail;
  constructor(
    private sp: SpinnerOverlayService,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.createUser = new User();
    this.createUserDetail = new UserDetail();
    this.createUser.profile = this.createUserDetail;

  }

  ngOnInit() {
  }

  addUser(addUserForm: NgForm) {
    this.sp.show();
    var user = new User();
    user = this.createUser;
    console.log(user);
    this.authService.createUser(user)
      .subscribe(data => {
        console.log("data add User", data)
        this.toastService.success("Account created", "");
        location.reload();
      }, (err) => {
        this.toastService.error("Account created fail", "");
        this.sp.hide();
      }
      );
  }

}
