import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'minimapa',
  templateUrl: './minimapa.component.html',
  styleUrls: ['./minimapa.component.css']
})
export class MinimapaComponent  implements AfterViewInit{

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLvl: number = 15;

@Input() lngLat? : [number, number];


  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw "Map div not found";
    if(!this.lngLat) throw "LngLat can't be null";
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoomLvl, // starting zoom
      interactive: false
      });

      new mapboxgl.Marker({
        draggable: false,
      })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
