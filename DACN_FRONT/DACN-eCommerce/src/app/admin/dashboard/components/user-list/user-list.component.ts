import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { OrderPipe } from "ngx-order-pipe";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SpinnerOverlayAdminService } from "../../../../shared/spinner-overlay-admin/spinner-overlay-admin.service";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  Users: User[] = [];
  source: LocalDataSource;
  page = 1;
  order = "user.profile[0].firstName";
  sortedCollection: any[];
  reverse = false;
  emailFilter: any = { emailAddress: "" };
  constructor(
    private authService: AuthService,
    private orderPipe: OrderPipe,
    private router: Router,
    private sp: SpinnerOverlayAdminService,
    private toastService: ToastrService,
  ) {
    this.sortedCollection = this.orderPipe.transform(this.Users, "user.profile[0].firstName");
    this.source = new LocalDataSource(this.Users);
  }


  settings = {
    columns: {
      avatar: {
        title: "Avatar",
        type: "html",
        valuePrepareFunction: (value) => {
          console.log(value)
          if (value !== undefined && value !== null && value !== "") {
            return " <img src= " + value + " width='80' height='60'/>";
          } else {
            return " <img src='./assets/images/631929649c.svg' width='80' height='60'/>";
          }
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      name: {
        title: "User Name",
        actions: {
          add: false,
          edit: false,
        },
      },
      emailAddress: {
        title: "Email",
        actions: {
          add: false,
          edit: false,
        },
      },
      address: {
        title: "Address",
        actions: {
          add: false,
          edit: false,
        },
      },
      permission: {
        title: "Role",
        actions: {
          add: false,
          edit: false,
        },
        type: "html",
        valuePrepareFunction: (value) => {
          if (value === "ADMIN") {
            return "<a class=\"badge badge-warning ml-5 px-3 py-1\">" + value + "</a>";
          } else {
            return "<a class=\"badge badge-success ml-5 px-3 py-1\">" + value + "</a>";
          }
        },
      }
    },
    actions: {
      add: false,
      width: "10%",
      position: "right"
    },
    mode: "external",
    edit: {
      editButtonContent: '<i class="fa fa-pencil ml-1 mr-3" aria-hidden="true" ></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true" ></i>'
    }
  };


  ngOnInit() {
    this.sp.show("Loading data...");
    this.authService.getAllUser()
      .subscribe(data => {
        console.log("All user", data);
        for (let item of data) {
          item.name = item.profile[0].firstName + " " + item.profile[0].lastName;
          item.address = item.profile[0].address1;
        }
        this.Users = data;
        this.source = new LocalDataSource(this.Users);
        this.sp.hide();
        this.toastService.success("Get data successful", "");
      }, (err) => {
        console.log(err);
        this.sp.hide();
        this.toastService.error("Get data error", "")
      });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }


  onEdit(event: any): void {
    this.router.navigate(["/admin/dashboard/edit-user/" + event.data.id]);
  }

  onDelete(event: any) {
    this.authService.deleteUser(event.data.id)
      .subscribe(data => {
        this.toastService.success("Delete user successful", "");
        this.Users.splice(this.Users.indexOf(event.data), 1);
        this.source = new LocalDataSource(this.Users);
      }, (err) => {
        this.toastService.error("Delete user error", "")
      });
  }
}
