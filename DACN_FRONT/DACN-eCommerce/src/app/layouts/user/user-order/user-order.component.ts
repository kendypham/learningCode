import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../../shared/services/order.service";
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { SpinnerOverlayAdminService } from 'src/app/shared/spinner-overlay-admin/spinner-overlay-admin.service';
import * as Moment from "moment";
@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  orderLists: any[] = [];
  loading = false;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastrService,
    private sp: SpinnerOverlayAdminService,
  ) { }

  settings = {
    columns: {
      createdAt: {
        title: "Ordered at",
        type: "text",
        valuePrepareFunction: (value) => {
          return Moment(value).format("L");
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      orderItems: {
        title: "Order item",
        type: "html",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
        valuePrepareFunction: (value) => ("<ul>" + value.map((item) => "<li>" + item.productName + "</li>") + "</ul>")
      },
      location: {
        title: "Location",
        type: "text",
        valuePrepareFunction: (value) => {
          return value.address + ", " + value.district + ", " + value.city;
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      deliveryDate: {
        title: "Delivery date",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      carrierService: {
        title: "Carrier",
        type: "text",
        valuePrepareFunction: (value) => {
          return value.name;
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      paymentMethod: {
        title: "Payment",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      total: {
        title: "Total",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      status: {
        title: "Status",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
  };
  ngOnInit() {
    this.sp.show("Loading data...");
    this.orderService.getOrder()
      .subscribe(data => {
        this.orderLists = this.addCustomerName(data);
        this.loading = true;
        this.sp.hide();
        this.toastService.success("Fetch data successful", "");
      }, err => {
        this.toastService.error("Error while fetching data", "");
      })
  }

  addCustomerName(data) {
    for (let temp of data) {
      temp.customerName = temp.firstName + " " + temp.lastName;
      temp.total = parseInt(temp.totalPrice, 10) + parseInt(temp.shipFee, 10);
      console.log(temp);
    }
    return data;
  }
}
