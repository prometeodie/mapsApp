import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlaceResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    private http = inject(HttpClient);
    public userLocation?:[number,number];
    public isLoadingPlaces: boolean = false;
    public places: Feature[] = [];

    get isUserLocationReady():boolean{
      return !!this.userLocation;
    }

  constructor() {
    this.getUserLocation();
  }


  public async getUserLocation(): Promise<[number,number]>{

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err)=>{
          alert('Unable to obtain geolocation')
          console.log(err)
        }
      )
    })
  }

  getPlaceByQuery(query:string = ''){
    this.isLoadingPlaces = true;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoicHJvbWV0ZW9kaWUiLCJhIjoiY2xtODk4YmQ5MDdiZjNjbGQybW5zN3AyNSJ9._uHx0FJm4Xtd8j_gFAsbBg`;
    this.http.get<PlaceResponse>(url).subscribe(resp =>{
      console.log(resp.features[0].center)
      this.isLoadingPlaces = false;
      this.places = resp.features;
    })

  }
}
