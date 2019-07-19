
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { dropWhile } from "node_modules/lodash";
import { OrderService } from "../../../../shared/services/order.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SpinnerOverlayAdminService } from "../../../../shared/spinner-overlay-admin/spinner-overlay-admin.service";
import * as Moment from "moment";
declare var google;

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
  _orderLists: any = [];
  selectedOrder: any = [];
  selectedStatus: any;
  loading = false;
  get orderLists() {
    return this._orderLists;
  }
  listStatus: Array<any> = ["Confirming", "Approved", "Rejected", "Canceled", "On hold", "Shipping", "Delivered", "Refunded",
    "Paid", "Error"]
  @Input() set orderLists(val: any) {
    this._orderLists = val.map(item => {
      try {
        item.address = item.location.address
        item.city = item.location.city
        item.district = item.location.district
      } catch (e) {
        if (item.location && item.location.city)
          item.fullAddress = item.location.city
        else item.fullAddress = ""
      }
      return item;
    });
  }
  constructor(
    private orderService: OrderService,
    private router: Router,
    private sp: SpinnerOverlayAdminService,
    private toastService: ToastrService,
  ) {
  }

  settings = {
    selectMode: "multi",
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
      customerName: {
        title: "Customer",
        actions: {
          add: false,
          edit: false,
        },
      },
      email: {
        title: "Email",
        actions: {
          add: false,
          edit: false,
        },
      },
      phoneNumber: {
        title: "Phone",
        actions: {
          add: false,
          edit: false,
        },
      },
      address: {
        title: "Address",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
      },
      district: {
        title: "District",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
      },
      city: {
        title: "City",
        type: "text",
        actions: {
          add: false,
          edit: false,
        },
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
      paymentMethod: {
        title: "Payment",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      totalPrice: {
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
    console.log("Chay vao day");
    this.sp.show("Loading data...");
    console.log("da show");
    this.orderService.getAllOrder()
      .subscribe(data => {
        console.log(data);
        this.orderLists = this.addCustomerName(data);
        this.toastService.success("Get data successful", "");
        this.loading = true;
        this.sp.hide();
      }, err => {
        console.log(err);
        this.sp.hide();
        this.toastService.error("Get data error", "error")
      });
  }



  selectRow(event: any): void {
    console.log(event);
    switch (event.isSelected) {
      case true:
        this.selectedOrder.push(event.data.id);
        break;
      case false:
        this.selectedOrder = dropWhile(this.selectedOrder, val => val === event.data.id);
        break;
      case null:
        if (this.selectedOrder.length < this.orderLists.length) {
          this.selectedOrder = [];
          this.orderLists.map((item) => {
            this.selectedOrder.push(item.id);
          });
        } else {
          this.selectedOrder = [];
        }
        break;
    }
    console.log(this.selectedOrder);
  }


  addCustomerName(data) {
    for (let temp of data) {
      temp.totalPrice = parseInt(temp.totalPrice, 10) + parseInt(temp.shipFee, 10);
      temp.customerName = temp.firstName + " " + temp.lastName;
    }
    return data;
  }
  onChangeStatus() {
    const data = {
      status: this.selectedStatus,
      ids: this.selectedOrder
    }
    this.updateOrder(data);
  }
  onCancel() {
    const data = {
      status: "Canceled",
      ids: this.selectedOrder
    }
    this.updateOrder(data);
  }
  updateOrder(data) {
    console.log(data);
    this.orderService.updateOrder(data)
      .subscribe(res => {
        console.log(res);
        this.toastService.success("Update order successful", "");
        this.loading = true;
        this.sp.hide();
        location.reload();
      }, err => {
        console.log(err);
        this.sp.hide();
        this.toastService.error("Update order error", "error");
      });
  }
}
