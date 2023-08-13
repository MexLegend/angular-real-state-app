// Core Imports
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';

import { Listing } from '../types/listing';
import { environment } from '../../environments/environment';
import { SafeUser } from '../types';

export interface IListingsParams {
  category?: string;
  userId?: string;
  locationParams?: string[]
}

export interface ListingsByCategory {
  listings?: Listing[];
  isLoading: boolean;
}

interface ListingResponse {
  ok: boolean;
  listing?: Listing;
  listings?: Listing[];
}

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) { }

  public emitFilterCategory: EventEmitter<ListingsByCategory> =
    new EventEmitter();
  public emitReloadListings: EventEmitter<boolean> = new EventEmitter();
  public emitStepperData: EventEmitter<Listing> = new EventEmitter();
  public emitIsSaving: EventEmitter<boolean> = new EventEmitter();

  getListings(params?: IListingsParams): Observable<Listing[]> {
    const url = `${environment.URI}/api/listings`;

    return this.http.get(url, { params: { ...params } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getFavoriteListings(listingIds: string[]): Observable<Listing[]> {
    const url = `${environment.URI}/api/listings/favorites/list`;

    return this.http.get(url, { params: { listingIds } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getListingById(listingId: string): Observable<Listing> {
    const url = `${environment.URI}/api/listings/${listingId}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAgentProperties(userId: string): Observable<Listing[]> {
    const url = `${environment.URI}/api/listings/properties/list`;

    return this.http.get(url, { params: { userId } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  async filterListingsByCategory(category?: string, locationParams?: string[]) {
    this.emitFilterCategory.emit({ isLoading: true });

    const newListingsByCategory = await lastValueFrom(
      this.getListings({ category, locationParams })
    );
    this.emitFilterCategory.emit({
      isLoading: false,
      listings: newListingsByCategory,
    });
  }

  createListing(listingData: Listing): Observable<ListingResponse> {
    const url = `${environment.URI}/api/listings/create`;
    const dataListing = {
      ...listingData,
      images: listingData?.images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
      price: String(listingData?.price),
    };

    return this.http.post<ListingResponse>(url, dataListing).pipe(
      map((resp) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  deleteListing(listingId: string): Observable<ListingResponse> {

    const url = `${environment.URI}/api/listings/${listingId}`;

    return this.http.delete<ListingResponse>(url).pipe(
      map((resp) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  updateListing(listingData: Listing, listingId: string): Observable<ListingResponse> {

    const url = `${environment.URI}/api/listings/${listingId}`;
    const dataListing = {
      ...listingData,
      images: listingData?.images.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      })),
      price: String(listingData?.price),
    };

    return this.http.put<ListingResponse>(url, dataListing).pipe(
      map((resp) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );

  }

  toggleFavorite(listingId: string, user: SafeUser) {
    const url = `${environment.URI}/api/listings/favorites/${listingId}`;
    const hasFavorited = this.isFavorite(listingId, user.favoriteIds || []);

    if (hasFavorited) {
      return this.http.delete(url).pipe(
        map((resp: any) => resp),
        catchError((err) => {
          return throwError(() => err);
        })
      );
    } else {
      return this.http.post(url, null).pipe(
        map((resp: any) => resp),
        catchError((err) => {
          return throwError(() => err);
        })
      );
    }
  }

  isFavorite(listingId: string, favoriteIds: string[]) {
    return favoriteIds.includes(listingId);
  }
}
