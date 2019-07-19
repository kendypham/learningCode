import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User, UserDetail } from "src/app/shared/models/user";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { AuthService } from "./../../../../shared/services/auth.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  updateUser: User;
  userProfile: UserDetail;
  Users: User[] = [];
  loading = false;
  selectedFile: File = null;
  loggedUser: User;
  private sub: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.updateUser = new User();
    this.userProfile = new UserDetail();
    this.updateUser.profile = this.userProfile;
    this.authService.getProfile()
      .subscribe(data => {
        this.loggedUser = data.data.user;
      }, (err) => {
        console.log("error", err);
      });

    this.sub = this.route.params.subscribe((params) => {
      const id = params["id"];
      this.getDetail(id);
    });
  }

  getDetail(id) {
    this.authService.getAllUser()
      .subscribe(data => {
        this.Users = data;
        for (let user of this.Users) {
          if (user.id === id) {
            this.updateUser = user;
            this.loading = true;
          }
        }
      }, (err) => {
        console.log(err);
      });
  }

  updateUserDetail(updateUserForm: NgForm) {
    var user = new User();
    var profile = new UserDetail();
    user.profile = profile;
    user.emailAddress = this.updateUser.emailAddress;
    user.userId = this.updateUser.id;
    user.profile.firstName = this.updateUser.profile[0].firstName;
    user.profile.lastName = this.updateUser.profile[0].lastName;
    user.profile.country = this.updateUser.profile[0].country;
    user.profile.state = this.updateUser.profile[0].state;
    user.profile.zip = this.updateUser.profile[0].zip;
    user.profile.address1 = this.updateUser.profile[0].address1;
    user.profile.address2 = this.updateUser.profile[0].address2;
    if (this.loggedUser.id == this.updateUser.id) {
      const formData: FormData = new FormData();
      formData.append("avatar", this.selectedFile);
      this.authService.uploadUserAvatar(formData)
        .subscribe(data => {
          this.toastService.success("Upload avatar", "Successful")
        }, (err) => {
          this.toastService.error("Upload avatar", "Error")
        }
        );
    }
    this.authService.updateUserDetail(user)
      .subscribe(data => {
        console.log("data update User", data)
        this.toastService.success("Account update", "");
        location.reload();
        // this.router.navigate(["/admin/dashboard/view-user"]);
      }, (err) => {
        this.toastService.error("Upload user", "Error")
      }
      );

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }


}
