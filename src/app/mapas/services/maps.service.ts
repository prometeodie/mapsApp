import { Injectable, inject } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionApiClient } from '../api/directionApiClient';
import { Direction, Route } from '../interfaces/direction.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map?: mapboxgl.Map;
  private markers: Marker[] = [];
  private directionApi = inject(DirectionApiClient);

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

  createMarkersForPlaces(places:Feature[], userLocation: [number,number]){
    if(!this.map ){throw new Error('map cannot be loaded')}


    this.markers.forEach( marker => marker.remove())
    const newMarkers = [];

    for (const place of places) {
        const [lng, lat ] = place.center;
        const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `);
        const newMarker = new Marker()
        .setLngLat([ lng, lat ])
        .setPopup(popup)
        .addTo(this.map);

        newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if(places.length === 0) return;

    const bounds = new LngLatBounds();
    bounds.extend(userLocation);
    newMarkers.forEach(marker =>{
      bounds.extend(marker.getLngLat())
    })

    this.map.fitBounds(bounds,{
      padding: 150
    })
  }

  getRouteBetweenPoints(start:[number,number], end: [number,number]){

    this.directionApi.get<Direction>(`/${ start.join(',')};${ end.join(',') }`)
    .subscribe(resp => this.drawPolyline(resp.routes[0]))

  }

  private drawPolyline(route: Route){

    if(!this.map) throw new Error ('Map is not available');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([ lng, lat ]);
    });

    this.map?.fitBounds( bounds, {
      padding: 200
    });

    //polyline or linestring
    const sourceData: AnySourceData  = {
      type:'geojson',
      data:{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }
    if( this.map.getLayer('RoutesString') ) {
      this.map.removeLayer('RoutesString');
      this.map.removeSource('RoutesString');
    }

    this.map.addSource( 'RoutesString', sourceData );

    this.map.addLayer({
      id: 'RoutesString',
      type:'line',
      source: 'RoutesString',
      layout: {
        "line-cap": 'round',
        "line-join": 'round'
      },
      paint: {
        "line-color":"black",
        "line-width": 3
      }
    })
  }

}
