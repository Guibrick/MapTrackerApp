import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../packages/models/package';
import { PackageService } from '../packages/services/package.service';
import { GoogleMapsService } from './services/geocoding.service';

@Component({
  selector: 'app-testmap',
  templateUrl: './testmap.component.html',
  styleUrls: ['./testmap.component.css'],
})
export class TestMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  map: any;
  center = { lat: 59.3293, lng: 18.0686 };
  packages: Observable<Package[]>;

  constructor(
    private maps: GoogleMapsService,
    private renderer: Renderer2,
    public packageService: PackageService,
  ) {}

  ngOnInit() {
    this.packages = this.packageService.loadPackages();
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;

      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 5,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [googleMaps.MapTypeId.ROADMAP, 'mapId'],
        },
      });

      var mapType = new googleMaps();
      this.map.mapTypes.set('mapId', mapType);
      this.map.setMapTypeId('mapId');
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log(e);
    }
  }
}
