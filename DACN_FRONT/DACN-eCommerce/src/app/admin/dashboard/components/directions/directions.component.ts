import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
declare var google;

@Component({
  selector: 'directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit, AfterViewInit {

  markers = []
  zoom = 15
  position = {
    lat: 10.8852095,
    lng: 106.7822039
  }
  constructor(
    private dashboardService: DashboardService,

  ) {
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.test()
  }

  test = () => {
    let locations = [
      {
        "id": 1,
        "lat": 10.750363390317254,
        "lng": 106.72822952270508

      },
      {
        "id": 2,
        "lat": 10.8606115,
        "lng": 106.5656523

      },
      {
        "lat": 10.807295092650861,
        "lng": 106.70921730185239

      },
      {
        "lat": 10.7170991335427,
        "lng": 106.72838438496842

      },
      {
        "lat": 10.811384019410319,
        "lng": 106.71512889052121

      },
      {
        "lat": 10.802579653735302,
        "lng": 106.7158376356723

      },
      {
        "lat": 10.81290338982259,
        "lng": 106.7138768977876

      },
      {
        "lat": 10.816020879234866,
        "lng": 106.7100648799011

      },
      {
        "lat": 10.81168963283228,
        "lng": 106.71121286535947

      },
      {
        "lat": 10.811384019410319,
        "lng": 106.71753214979856

      },
      {
        "lat": 10.816697295456045,
        "lng": 106.71321019962306

      },
      {
        "lat": 10.8081157075778,
        "lng": 106.71485813718164
      }

    ]
    this.dashboardService.smartShippingDirections({ shippingIds: locations, k: 3 })
      .subscribe(data => {
        this.createPolyline(data[0].optimize, 'map1');
        this.createPolyline(data[1].optimize, 'map1');
        this.createPolyline(data[2].optimize, 'map1');
        console.log(data)
      }, (err) => {
        console.log(err);
      });
    // this.dashboardService.manualShippingDirections({ shippingIds: locations, k: 3 })
    //   .subscribe(data => {
    //     this.createPolyline(data.optimize, 'map1');
    //     console.log(data)
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
  abs = []
  map
  createPolyline(locations, idmap) {
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false
    });
    const directionsService = new google.maps.DirectionsService();
    if (!this.map)
      this.map = new google.maps.Map(document.getElementById(idmap));
    var marker, i;
    var request: any = {
      travelMode: google.maps.TravelMode.WALKING,
      optimizeWaypoints: true
    };
    for (i = 0; i < locations.length; i++) {
      marker = {
        lat: locations[i][0] ? locations[i][0] : locations[i].lat,
        lng: locations[i][1] ? locations[i][1] : locations[i].lng
      }
      this.markers.push(new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(marker.lat, marker.lng),
        map: this.map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }));

      if (i === 0) {
        request.origin = marker;
        request.destination = marker;
      }
      else {
        if (!request.waypoints) request.waypoints = [];
        request.waypoints.push({
          location: marker,
          stopover: true
        });
      }
    }
    var that = this;
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay = new google.maps.DirectionsRenderer({
          // suppressInfoWindows: true,
          // suppressMarkers: true,
          map: that.map
        });
        that.abs.push(directionsDisplay)
        directionsDisplay.setDirections(result);
        // var line = new google.maps.Polyline({ path: result.routes[0].overview_path });
        // that.markers.forEach(function (marker) {
        //   marker.setMap((google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), line, .01)) ? map : null);
        // });
      }
    });
  }
  // createPolyline2(locations, idmap) {
  //   let directionsDisplay = new google.maps.DirectionsRenderer({
  //     draggable: true
  //   });
  //   let directionsService = new google.maps.DirectionsService();
  //   var map = google.maps.Map(document.getElementById(idmap));
  //   directionsDisplay.setMap(map);
  //   var marker, i;
  //   var request: any = {
  //     travelMode: google.maps.TravelMode.WALKING,
  //     optimizeWaypoints: false
  //   };
  //   for (i = 0; i < locations.length; i++) {
  //     marker = {
  //       lat: locations[i][0],
  //       lng: locations[i][1]
  //     }
  //     if (i === 0) {
  //       request.origin = marker;
  //       request.destination = marker;
  //     }
  //     else {
  //       if (!request.waypoints) request.waypoints = [];
  //       request.waypoints.push({
  //         location: marker,
  //         stopover: true
  //       });
  //     }
  //   }
  //   var that = this;
  //   directionsService.route(request, function (result, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       directionsDisplay.setDirections(result);
  //     }
  //   });
  // }
}
