import { Component, inject} from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services';

@Component({
  selector: 'btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  private mapsService = inject(MapsService);
  private placesService = inject(PlacesService);

  constructor() { }

  goToMylocation(){

    if(!this.placesService.isUserLocationReady) throw new Error('there is not User Location');
    if(!this.mapsService.isMapReady) throw new Error('Map is not ready');

    this.mapsService.flyTo(this.placesService.userLocation!);
  }

}
