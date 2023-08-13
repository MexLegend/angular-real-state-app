import { EventEmitter, Injectable } from '@angular/core';
import { Listing, Location } from '../types/listing';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface MapboxPopUp {
  lisnting: Listing,
  externalNumber?: number;
  internalNumber?: number;
  street: string;
  suburb?: string;
  postalCode?: number;
}

export interface PlacesResponse {
  type: string;
  query: [];
  features: Feature[];
  attibution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type?: string;
  place_name?: string;
  place_name_es?: string;
  relevance?: number;
  properties?: Properties;
  text_es?: string;
  text?: string;
  center?: number[];
  context?: Context[];
  geometry: Geometry;
}

export interface Context {
  id: string;
  short_code: ShortCode;
  text: string;
  text_es: string;
  language: Language;
  language_es: Language;
}

export enum Language {
  Es = "es"
}

export enum ShortCode {
  CR = "cr",
  CRA = "CR-A"
}

export type Geometry = {
  type: string;
  coordinates: number[];
}

interface Marker {
  type: string,
  geometry: {
    type: string,
    coordinates: [number, number]
  },
  properties: {
    iconSize: [number, number]
  }
}

export type Properties = {
  foursquare?: string;
  landmark?: boolean;
  category?: string;
  maki?: string;
  address?: string;
}

interface SearchApiProps {
  country: string;
  limit: number;
  language: string;
  access_token: string;
  proximity: string;
}

interface FormatedLocation {
  location: Location,
  placeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  public emitSelectedLocation: EventEmitter<FormatedLocation> = new EventEmitter();
  public emitSetSearchInputValue: EventEmitter<Location> = new EventEmitter();

  constructor(private http: HttpClient) { }

  searchPlaceByTerm(query: string): Observable<Feature[]> {

    const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    const params = {
      access_token: environment.MAPBOX_TOKEN,
      // country: "mx",
      language: "es",
      limit: 5,
      proximity: "ip"
    };

    return this.http.get<PlacesResponse>(apiUrl + query + '.json', { params: params })
      .pipe(map((res: PlacesResponse) => res.features));
  }

  formatFeatureToLocation(feature: Feature): FormatedLocation {
    const [country, region, placeAndPostCode, address] = feature.place_name!.split(",").reverse().map(elem => elem.trim());
    const [place, postCode] = placeAndPostCode ? placeAndPostCode.match(/[^\d]+|\d+/g)!.reverse()!.map(elem => elem.trim()) : [];

    return {
      location: {
        coordinates: feature.geometry.coordinates,
        country,
        region,
        place,
        postCode: postCode ? Number(postCode) : undefined,
        address,
        placeName: feature.place_name!
      },
      placeName: feature.place_name!
    }
  }
}
