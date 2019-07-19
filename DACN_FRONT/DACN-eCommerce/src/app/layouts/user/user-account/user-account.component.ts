import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserDetail } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from '../../../shared/services/toastr.service';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  loggedUser: User;
  loading = false;
  selectedFile: File = null;
  IsmodelShow = false;
  // Enable Update Button
  user = {
    oldPassword: "",
    newPassword: ""
  }
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    // this.loggedUser = this.authService.getLoggedInUser();
    // console.log("Logged user", this.loggedUser);

    this.authService.getProfile()
      .subscribe(data => {
        this.loggedUser = data.data.user;
        console.log("data", this.loggedUser);
        console.log("email", this.loggedUser.emailAddress);
        this.loading = true;
        this.toastService.success("Get data successful", "");
      }, (err) => {
        this.toastService.error("Get data error", "");
      });
  }

  updateUserDetail(updateUserForm: NgForm) {
    var user = new User();
    var profile = new UserDetail();
    user.profile = profile;
    user.emailAddress = this.loggedUser.emailAddress;
    user.userId = this.loggedUser.id;
    user.profile.firstName = this.loggedUser.profile[0].firstName;
    user.profile.lastName = this.loggedUser.profile[0].lastName;
    user.profile.country = this.loggedUser.profile[0].country;
    user.profile.state = this.loggedUser.profile[0].state;
    user.profile.zip = this.loggedUser.profile[0].zip;
    user.profile.address1 = this.loggedUser.profile[0].address1;
    user.profile.address2 = this.loggedUser.profile[0].address2;

    const formData: FormData = new FormData();
    formData.append("avatar", this.selectedFile);
    this.authService.uploadUserAvatar(formData)
      .subscribe(data => {
        console.log("Avatar update User", data)
      }, (err) => {
        console.log(err);
      }
      );

    this.authService.updateUserDetail(user)
      .subscribe(data => {
        console.log("data update User", data)
        this.toastService.success("Account update", "");
        location.reload();
        this.router.navigate(["/admin/dashboard/view-user"]);
      }, (err) => {
        this.toastService.error("Account create error", "");
      }
      );

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onClickFile(event) {
    var test: HTMLElement = this.document.getElementsByClassName('file-upload')[0] as HTMLElement;
    (test).click();
  }

  changePassword(changePassword: NgForm) {
    var data = {
      oldPassword: this.user.oldPassword,
      newPassword: this.user.newPassword
    }
    this.authService.changePassword(data)
      .subscribe(data => {
        this.toastService.success("Change password successful", "");
        this.authService.logout();
        this.IsmodelShow = true;
        this.router.navigate(["/login"]);
      }, err => {
        this.toastService.error("Something error", "Please check again your credential")
      })
  }
}

