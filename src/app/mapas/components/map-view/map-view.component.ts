import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;

  private placesService = inject(PlacesService);
  private mapsService = inject(MapsService);

  ngAfterViewInit(): void {

    if(!this.placesService.userLocation) throw new Error('there is not a user location')
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

      const popup = new Popup()
      .setHTML(`
        <h6>You are here!</h6>
        <span> you are in this word place</span>
      `);

      new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation!)
      .setPopup(popup)
      .addTo(this.map)

      this.mapsService.setMap(this.map);

  }

}
