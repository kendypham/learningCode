import { Routes } from "@angular/router";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "reset_password",
        component: ResetPasswordComponent
      },
      {
        path: 'confirm',
        component: ConfirmEmailComponent
      }
    ]
  }
];
