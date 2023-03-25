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
  car = [
    { lat: 56, lng: 23 },
    { lat: 55, lng: 22 },
    { lat: 54, lng: 21 },
    { lat: 53, lng: 20 },
  ];
  marker: any;

  constructor(private maps: GoogleMapsService, private renderer: Renderer2) {}

  ngOnInit(): void {}
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
    this.addMarker(this.car);
  }

  addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    this.car.map(
      (x) =>
        new googleMaps.Marker({
          position: x,
          map: this.map,
          draggable: true,
        })
    );
  }
}
