import { Component, OnInit } from "@angular/core";
import { EmailValidator, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { SocketService } from "src/app/shared/services/socket.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { SpinnerOverlayService } from "src/app/shared/spinner-overlay/spinner-overlay.service";
import { User } from "../../shared/models/user";
import { AuthService } from "../../shared/services/auth.service";
import { NavbarFooterService } from "../../shared/services/nav-bar-footer.service";
import { ToastrService } from "./../../shared/services/toastr.service";

declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: ""
  };
  errorInUserCreate = false;
  errorInUserReset = false;
  errorMessage: any;
  createUser;
  forgotUser = {
    emailAddress: ""
  };
  isConfirm: any = "";
  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService,
    private socketService: SocketService,
    private router: Router,
    private sp: SpinnerOverlayService,
    public navbarFooterService: NavbarFooterService,


  ) {
    this.createUser = new User();
    navbarFooterService.show();
  }

  ngOnInit() {
    if (JSON.parse(this.storageService.getUser()).isConfirmed != null) {
      this.isConfirm = JSON.parse(this.storageService.getUser()).isConfirmed;
    }
    if (this.authService.isLoggedIn() && this.isConfirm) {
      this.router.navigate(["/"]);
    }
  }



  addUser(userForm: NgForm) {
    this.sp.show();
    var user = new User();
    user.emailAddress = userForm.value["emailId"];
    user.password = userForm.value["password"];
    this.authService.createUser(user)
      .subscribe(data => {
        this.toastService.success("Account created", "");
        location.reload();
      }, (err) => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        this.toastService.error("Error while Creating User", err);
        this.sp.hide();
      }
      );
  }

  signInWithEmail(userForm: NgForm) {
    this.sp.show();
    var user = new User();
    user.emailAddress = userForm.value["emailId"];
    user.password = userForm.value["loginPassword"];
    this.authService.signInWithGmail(user)
      .subscribe(data => {
        this.storageService.storeAccessToken(data.token);
        this.isConfirm = JSON.parse(this.storageService.getUser()).isConfirmed;
        if (this.isConfirm == true) {
          this.toastService.success("Login success", "");
          this.sp.hide();
          location.reload();
        }
        else {
          this.sp.hide();
          this.router.navigate(["/confirm"]);
        }
      }, (err) => {
        this.toastService.error("Authentication Failed", "Invalid Credentials, Please Check your credentials");
        this.sp.hide();
      }
      );
  }

  signInWithGoogle() {
    this.sp.show();
    this.authService
      .signInWithGoogleType1()
      .then((res) => {
        var data: any = res.additionalUserInfo;
        console.log("google logged", res.additionalUserInfo);
        var user = new User();
        user.emailAddress = data.profile.email;
        user.googleId = data.profile.id;
        this.authService.signInWithGoogleType2(user)
          .subscribe(data => {
            //   this.isLoadingResults = false;
            this.storageService.storeAccessToken(data.token);
            console.log("1", this.storageService.getUser());
            console.log("2", this.storageService.getAccessToken());
            this.toastService.success("Account syncing...", "");
            location.reload();
          }, (err) => {
            console.log(err);
            this.sp.hide();
            //   this.isLoadingResults = false;
          }
          )
      })
      .catch((err) => {
        this.sp.hide();
        this.toastService.error("Error Occured", "Please try again later");
      });
  }

  forgotPassword(userResetForm: NgForm) {
    var data = {
      emailAddress: this.forgotUser.emailAddress
    }
    this.authService.forgotPassword(data)
      .subscribe(data => {
        this.toastService.success("Reset link successful", "Please check your mail");
      }, err => {
        this.errorInUserReset = true;
        this.toastService.error("Error Occured", "Please try again later");
      })
  }
}
