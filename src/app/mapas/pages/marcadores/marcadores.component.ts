import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';



interface Marker{
  color: string,
  marker: mapboxgl.Marker,
  center?: [number, number],
}
interface MarkerLocalStorage{
  color: string,
  center: [number, number],
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
  styles:[
    `
      .mapa-container{
      width: 100%;
      height: 100%;

      }

      .list-group{
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 999;
      }

      li{
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements  AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLvl: number = 15;
  center : [number, number] =  [-59.106285, -37.323924];
  markers  : Marker[]  = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.center, // starting position [lng, lat]
    zoom: this.zoomLvl, // starting zoom
    });

    this.leerLocalStorage();
  }

  newMarker(){

    if(this.markers.length >= 10){
      alert('you have reached the maximum number of markers');
      return;
    }
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.map);

    this.markers.push({color, marker: newMarker});
    this.guardarMarcadoresLocalSt();

    this.addDragEventToMarker(newMarker);

  }

  irMarcador(marker: mapboxgl.Marker){

    this.map.flyTo({
      center: marker.getLngLat()
    })

  }

  guardarMarcadoresLocalSt(){

    const lngLatArr: MarkerLocalStorage[] = [];


      this.markers.forEach((m)=>{
        const color = m.color;
        const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [ lng, lat ]
      })

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

      })
  }

  addDragEventToMarker(newMarker: mapboxgl.Marker){
    newMarker.on('dragend',()=>{
      this.guardarMarcadoresLocalSt();
    });
  }

  leerLocalStorage(){

    if(!localStorage.getItem('marcadores')){
      return;
    }

    const markers: Marker[] = JSON.parse(localStorage.getItem('marcadores')!);

    markers.forEach( m =>{

      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color:m.color,
      })
      .setLngLat(m.center!)
      .addTo(this.map);
      this.markers.push({color:m.color, marker:newMarker});

      this.addDragEventToMarker(newMarker);
    })
  }

  deleteMarker(i: number){
    this.markers[i].marker?.remove();
    this.markers.splice(i,1);
    this.guardarMarcadoresLocalSt();
  }
}
