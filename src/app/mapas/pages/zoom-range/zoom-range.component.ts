import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css'],
  styles:[
   `.mapa-container{
    width: 100%;
    height: 100%;
   }

   .row{
    background-color: white;
    border-radius: 5px;
    bottom:50px;
    left:50px;
    padding:10px;
    width:300px;

    position:fixed;
    z-index: 9999;
   }

   `
  ]
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLvl: number = 10;
  center: [number, number] =  [-59.106285, -37.323924]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom',()=>{});
    this.map.off('zoomend',()=>{});
    this.map.off('move',()=>{});
  }


   ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.center, // starting position [lng, lat]
    zoom: this.zoomLvl, // starting zoom
    });

    // ZOOM
    this.map.on('zoom',(event)=>{
      this.zoomLvl = event.target.getZoom()
    })

    this.map.on('zoomend',(event)=>{
     if(this.zoomLvl > 18){
      this.map.zoomTo(18);
     }
    })

    // MOVIEMIENTO

    this.map.on('move', (event)=>{
      const target = event.target;
      const {lng, lat} = target.getCenter()
      this.center =[lng, lat];
    })


  }

  zoomOut(){
    this.map.zoomOut();

  }

  zoomIn(){
    this.map.zoomIn();

  }

  zoomChanged(zoomValue: string){
      this.map.zoomTo(Number(zoomValue))
  }




}
