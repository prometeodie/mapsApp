import { Injectable } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map?: mapboxgl.Map;

  get isMapReady(){
    return !!this.map;
  }

  setMap(map:mapboxgl.Map){
    this.map = map;
  }

  flyTo (coords:LngLatLike){
    if(!this.isMapReady) throw new Error ('Map is not initialized')

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }
}
