import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "./shared/animations/fadeIntRoute";
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";
import { SocketService } from "./shared/services/socket.service";
declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService,
  ) { }

  ngOnInit() {

    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });

    // $(document).ready(function () {
    //   $(".banner").owlCarousel({
    //     autoHeight: true,
    //     center: true,
    //     nav: true,
    //     items: 1,
    //     margin: 30,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 5000,
    //     autoplayHoverPause: true
    //   });
    // });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    }

    this.socketService.notifyUserOnline();
  }

  setGeoLocation(position: any) {
    this.authService.setLocation(
      position["coords"].latitude,
      position["coords"].longitude
    );
  }
}
