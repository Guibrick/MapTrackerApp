import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    public packageService: PackageService,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit() {
    this.packages = this.packageService.loadPackages();
    this.findAddresses();
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
}
