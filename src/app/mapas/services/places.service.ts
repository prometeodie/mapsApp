import { Injectable, inject } from '@angular/core';
import { Feature, PlaceResponse } from '../interfaces/places';
import { PlaceApiClient } from '../api/placesApiClient';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    private placesApi = inject(PlaceApiClient);
    private mapService = inject(MapsService);
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
        }
      )
    })
  }

  getPlaceByQuery(query:string = ''){
    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = []
      return;
    }
    if (!this.userLocation) throw new Error('user location does not exist')
    this.isLoadingPlaces = true;
    this.placesApi.get<PlaceResponse>(`/${query}.json`,{
    params:{
      proximity: this.userLocation.join(',')
    }}
    ).subscribe(resp =>{
      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkersForPlaces(this.places, this.userLocation!);
    })

  }

  deletePlaces(){
    this.places = [];
  }

}
