import { Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { findIndex, map, Observable } from 'rxjs';
import { Package } from '../packages/models/package';
import { PackageService } from '../packages/services/package.service';
import { GeocoderResponse } from './models/geocoder-response.model';
import { GeocodingService } from './services/geocoding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  packages: Observable<Package[]>;
  packagesRouteList: Package[] = [];

  address: string;
  locationCoords?: google.maps.LatLng | null = null;
  coordinates: google.maps.LatLng[] = [];
  fullAddresses: string[] = [];
  icon = {
    url: "https://cdn-icons-png.flaticon.com/512/8479/8479703.png",
    scaledSize: new google.maps.Size(50, 50)
  }
  center: google.maps.LatLngLiteral = { lat: 59.3293, lng: 18.0686 };
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoom: 12,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  };
  markerOptions: google.maps.MarkerOptions = {
    icon: this.icon,
  };
  directionsOptions: google.maps.DirectionsRendererOptions = {
    suppressMarkers: true,
  };

  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  waypointsArray: google.maps.DirectionsWaypoint[] = [];
  directionService: google.maps.DirectionsService;
  directionRender: google.maps.DirectionsRenderer;
  waypointsLoop: google.maps.DirectionsWaypoint[] = [];
  directionsResults: Observable<google.maps.DirectionsResult | undefined>;

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  constructor(
    public packageService: PackageService,
    private geocodingService: GeocodingService,
    private mapDirectionsService: MapDirectionsService
  ) { }

  ngOnInit() {
    this.packages = this.packageService.loadPackages();
    this.findAddresses();
    this.directionService = new google.maps.DirectionsService();
    this.directionRender = new google.maps.DirectionsRenderer();
    this.getRouteList();
  }

  findAddresses() {
    this.packages.subscribe((data) => {
      for (let item of data) {
        var fullAddress =
          item.StreetName +
          ' ' +
          item.StreetNumber +
          ', ' +
          item.Zip +
          ', ' +
          item.City;
        this.fullAddresses.push(fullAddress);
      }

      this.fullAddresses.forEach((address) => {
        this.geocodingService
          .getLocation(address)
          .subscribe((response: GeocoderResponse) => {
            if (response.status === 'OK') {
              const location = response.results[0];
              const loc: any = location.geometry.location;
              this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng);
              this.coordinates.push(this.locationCoords);
            }
          });
      });
    });
  }

  setRoutePolyline() {
    for (let i = 0; i < this.coordinates.length; i++) {
      this.waypointsLoop.push({ location: { lat: this.coordinates[i].lat(), lng: this.coordinates[i].lng() }, stopover: true })

      this.origin = { lat: this.coordinates[0].lat(), lng: this.coordinates[0].lng() };
      this.waypointsArray = this.waypointsLoop;
      this.destination = { lat: this.coordinates[this.coordinates.length - 1].lat(), lng: this.coordinates[this.coordinates.length - 1].lng() };
    }

    const request: google.maps.DirectionsRequest = {
      origin: this.origin,
      waypoints: this.waypointsArray,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    };
    this.directionsResults = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  getRouteList() {
    this.packages.subscribe((data) => {
      for (let item of data) {
        this.packagesRouteList.push(item);
      }
    })
  };

  onClick(arrayIndex: number): void {
    this.packagesRouteList = this.packagesRouteList.filter((item, index) => index !== arrayIndex);
    this.coordinates = this.coordinates.filter((item, index) => index !== arrayIndex);
    console.log(this.packagesRouteList);
    console.log(this.coordinates);
  }
}

