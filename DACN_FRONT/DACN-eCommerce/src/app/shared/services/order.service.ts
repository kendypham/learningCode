import { Injectable } from '@angular/core';
import { OrderCommand } from './command/order-command';
@Injectable()
export class OrderService {
  constructor(
    private orderCommand: OrderCommand,
  ) {

  }

  createOrder(data: any) {
    return this.orderCommand.createOrder(data);
  }

  getOrder() {
    return this.orderCommand.getOrder();
  }

  getAllOrder() {
    return this.orderCommand.getAllOrder();
  }

  updateOrder(data: any) {
    return this.orderCommand.updateOrder(data);
  }

}
