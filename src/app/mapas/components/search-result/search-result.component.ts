import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import { MapsService } from '../../services';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  private placesService = inject(PlacesService);
  private mapsService = inject(MapsService)
  public selectedId: string = '';

  get isLoadingplaces(){
    return this.placesService.isLoadingPlaces;
  }

  get places(){
    return this.placesService.places;
  }

  // TODO:modificar el dominio para que solo la url de vercel pueda acceder al api,, arreglar 320 propiedades css error

  flyTo(place: Feature){
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapsService.flyTo([lng,lat]);
  }

  getDirections( place: Feature ){

    if(!this.placesService.userLocation) throw new Error ('User Location is not Found');

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];

    this.mapsService.getRouteBetweenPoints(start , end)
  }
}
