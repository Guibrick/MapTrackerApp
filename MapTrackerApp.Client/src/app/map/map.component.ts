import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, Marker } from 'maplibre-gl';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  mapkey: string = environment.MY_KEY;


  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const initialState = { lng: 18.0686, lat: 59.3293, zoom: 10 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=` + this.mapkey,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.map.addControl(new NavigationControl({}), 'top-right');

    new Marker({ color: "#FF0000" })
      .setLngLat([18.0686, 59.3293])
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
