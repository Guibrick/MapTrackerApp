import { Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
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

  center: google.maps.LatLngLiteral = { lat: 59.3293, lng: 18.0686 };
  zoom = 12;
  address: string;
  locationCoords?: google.maps.LatLng | null = null;
  coordinates: google.maps.LatLng[] = [];
  fullAddresses: string[] = [];

  infoMarker: any = [];
  infoContent: string;
  description: string[] = [];
  markerOptions: google.maps.MarkerOptions = { label: "1" };

  packagesRouteList: Package[] = [];

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
    console.log(this.packagesRouteList);
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

  openInfoWindow(marker: MapMarker, content: google.maps.LatLng) {

    let cuca: string[];
    this.infoContent = cuca[0];

    this.packages.subscribe((data) => {
      for (let item of data) {
        if (this.locationCoords === content) {
          var information =
            item.FirstName +
            ' ' +
            item.LastName +
            ', ' +
            item.Product +
            ', ' +
            item.City;
          cuca.push(information);
        }
      }
      this.infoWindow.open(marker);
    }
    )
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
      travelMode: google.maps.TravelMode.DRIVING
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
  }
}


