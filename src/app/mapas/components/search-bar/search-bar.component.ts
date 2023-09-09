import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  private placesService = inject(PlacesService);
  constructor() { }

  onQueryChanged(query: string){
    if(this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(()=>{
      this.placesService.getPlaceByQuery(query);
    },350)

  }

}
