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
  fullAddresses: string[] = [];
  coordinates: google.maps.LatLng[] = [];
  infoMarker: any = [];
  description: string[] = [];

  source: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  directionService: google.maps.DirectionsService;
  directionRender: google.maps.DirectionsRenderer;

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
    this.directionRender = new google.maps.DirectionsRenderer({ map: null, suppressMarkers: true })
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
      this.source = { lat: 59.22045, lng: 17.50398 };
      this.destination = { lat: 59.3923388, lng: 17.9015298 };
    });
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  showInfo() {
    this.packages.subscribe((data) => {
      for (let item of data) {
        var information =
          item.FirstName +
          ' ' +
          item.LastName +
          ', ' +
          item.Product +
          ', ' +
          item.City;
        this.description.push(information);
      }
    });
  }

  setRoutePolyline() {
    const request: google.maps.DirectionsRequest = {
      origin: this.source,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }
};
