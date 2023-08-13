import { Component } from '@angular/core';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types/listing';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  reloadListingsSub$?: Subscription;

  isLoading: boolean = true;
  favoritesListings: Listing[] = [];

  constructor(
    private authService: AuthService,
    private listingsService: ListingsService
  ) {
    this.getFavorites();
    this.handleReloadListings();
  }

  ngOnDestroy(): void {
    this.reloadListingsSub$?.unsubscribe();
  }

  getFavorites() {
    const favoritesIds: string[] = this.authService.getCurrentUser()?.favoriteIds || [];

    const getFavoriteListingsSub$ = this.listingsService.getFavoriteListings(favoritesIds).subscribe((listings) => {
      this.favoritesListings = listings;
      this.isLoading = false;
      getFavoriteListingsSub$.unsubscribe();
    });
  }

  handleReloadListings() {
    this.reloadListingsSub$ = this.listingsService.emitReloadListings.subscribe(() => {
      this.getFavorites();
    });
  }

}
