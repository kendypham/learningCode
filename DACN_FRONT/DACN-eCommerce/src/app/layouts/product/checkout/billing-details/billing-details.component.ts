import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Product } from '../../../../shared/models/product';
import { User, UserDetail } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { BillingService } from '../../../../shared/services/billing.service';
import { CarrierService } from '../../../../shared/services/carrier.service';
import { NavbarFooterService } from "../../../../shared/services/nav-bar-footer.service";
import { OrderService } from '../../../../shared/services/order.service';
import { ProductService } from '../../../../shared/services/product.service';
import { ToastrService } from '../../../../shared/services/toastr.service';
// import { } from '@types/googlemaps';
declare var google;
@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  zoom: number = 15;
  position = {
    lat: 10.8852095,
    lng: 106.7822039
  }
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  selectedMarker;
  userDetails: User;
  products: Product[];
  userDetail: UserDetail;
  checkoutProducts: any[];
  data: any = {
    firstName: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    orderItemIds: [],
    description: "",
    paymentMethod: "",
    carrierId: "",
    carrierServiceId: "",
    deliveryDate: 0,
    weight: 0,
    couponCode: "",
    shipFee: 0,
    location: {
      city: "",
      district: "",
      address: "",
      location: {
        lat: 0,
        lon: 0
      }
    }
  };
  loggedUser: User;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService,
    private billingService: BillingService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private carrierService: CarrierService,
    private orderService: OrderService,
    public navbarFooterService: NavbarFooterService,
    private toastrService: ToastrService
  ) {
    /* Hiding Shipping Tab Element */
    document.getElementById('productsTab').style.display = 'none';
    document.getElementById('shippingTab').style.display = 'none';
    document.getElementById('billingTab').style.display = 'block';
    document.getElementById('resultTab').style.display = 'none';
    navbarFooterService.show();
    this.userDetail = new UserDetail();
    // this.products = productService.getLocalCartProducts();
    this.userDetails = authService.getLoggedInUser();
  }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(data => {
        this.loggedUser = data.data.user;
        console.log("data", this.loggedUser);
        this.data.email = this.loggedUser.emailAddress;
        this.data.firstName = this.loggedUser.profile[0].firstName;
        this.data.lastName = this.loggedUser.profile[0].lastName;
        this.data.phoneNumber = this.loggedUser.phoneNumber;
        this.data.location.city = this.loggedUser.profile[0].city;
        this.data.location.address = this.loggedUser.profile[0].address1;
        this.data.location.district = this.loggedUser.profile[0].state;

      }, (err) => {
        console.log("error", err);
      });
    this.data.carrierId = this.route.snapshot.queryParamMap.get('carrierId');
    this.data.carrierServiceId = this.route.snapshot.queryParamMap.get('carrierServiceId');
    this.data.paymentMethod = this.route.snapshot.queryParamMap.get('payMethod');


    this.productService.getOrderItem()
      .subscribe(data => {
        console.log("orderItem", data);
        this.checkoutProducts = [];
        for (let product of data) {
          if (product.inCart == true)
            this.checkoutProducts.push(product);
        }
        this.checkoutProducts.forEach((product) => {
          this.data.orderItemIds.push(product.id);
        });
        console.log("orderItemId", this.data.orderItemIds);
      }, err => {
        console.log(err);
      });
    this.getCarrierServiceById(this.data.carrierServiceId);

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
  }

  oderDetails(form: NgForm) {
    this.data.firstName = form.value.firstName;
    this.data.lastName = form.value.lastName;
    this.data.phoneNumber = form.value.phoneNumber;
    this.data.description = form.value.description;
    this.data.couponCode = form.value.couponCode;
    this.data.location.address = form.value.address;
    this.orderService.createOrder(this.data)
      .subscribe(data => {
        this.toastrService.success('Order create', '');
        this.productService.calculateCartProdCounts();
        this.router.navigate(['checkouts', { outlets: { checkOutlet: ['result'] } }]);

      }, err => {
        this.toastrService.error('Order create error', '');
      })

  }

  getCarrierServiceById(id: any) {
    this.carrierService.getCarrierServiceById(id)
      .subscribe(data => {
        this.data.shipFee = data.shipFee;
        if (data.name == "Giao hàng tiết kiệm") {
          this.data.deliveryDate = 15;
        }
        else this.data.deliveryDate = 7;

      }, err => {
        console.log(err);
      })
  }

  changeMarker = (lat: number, lng: number) => {
    this.position = { lat, lng };
    this.findAddress()
  }

  findAddress = () => {
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      var latlng = { lat: parseFloat(String(this.position.lat)), lng: parseFloat(String(this.position.lng)) };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (results[0]) {
          this.printAddress(results[0])
        } else {
          console.log('No results found');
        }
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position.lat = position.coords.latitude;
        this.position.lng = position.coords.longitude;
        this.position = {
          lat: this.position.lat,
          lng: this.position.lng
        };
        this.findAddress()
      });
    }
  }
  selectMarker(event) {
    // this.selectedMarker = {
    //   lat: event.latitude,
    //   lng: event.longitude
    // };
  }

  handleAddressChange(address: Address) {
    this.position.lat = address.geometry.location.lat();
    this.position.lng = address.geometry.location.lng();
    this.position = {
      lat: this.position.lat,
      lng: this.position.lng
    };
    this.printAddress(address)
  }

  printAddress(address: any) {
    if (!address) return;
    let tmp = address.formatted_address.split(',')

    if (tmp.length === 5) {
      this.data.location.address = tmp[0] + ' ,' + tmp[1]
      this.data.location.district = tmp[2]
      this.data.location.city = tmp[3]
    } else {
      this.data.location.address = tmp[0]
      this.data.location.district = tmp[1]
      this.data.location.city = tmp[2]
    }

    this.data.location.location.lat = this.position.lat
    this.data.location.location.lon = this.position.lng

  }
}
