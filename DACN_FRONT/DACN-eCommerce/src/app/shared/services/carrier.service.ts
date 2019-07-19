import { Injectable } from '@angular/core';
import { CarrierCommand } from './command/carrier-command';
@Injectable()
export class CarrierService {
  constructor(
    private carrierCommand: CarrierCommand
  ) {

  }

  getCarrier() {
    return this.carrierCommand.getCarrier();
  }

  getCarrierService() {
    return this.carrierCommand.getCarrierService();
  }

  getCarrierServiceById(id: any) {
    return this.carrierCommand.getCarrierServiceById(id);
  }

}
