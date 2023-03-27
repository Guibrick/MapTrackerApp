import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../packages/models/package';
import { PackageService } from '../packages/services/package.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  packages: Observable<Package[]>;
  display: any;
  center: google.maps.LatLngLiteral = { lat: 59.3293, lng: 18.0686 };
  zoom = 12;

  constructor(public packageService: PackageService) { }

  ngOnInit() {
    this.packages = this.packageService.loadPackages();
  }
}
