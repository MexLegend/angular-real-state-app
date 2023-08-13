import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getStorage } from 'src/app/helpers/storage';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-heart-button',
  templateUrl: './heart-button.component.html',
  styleUrls: ['./heart-button.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class HeartButtonComponent {

  @Input() listingId: string | null = null;
  @Input() emitReloadListings: boolean = false;

  currentUser?: SafeUser | null = null;

  constructor(
    private authService: AuthService,
    private listingService: ListingsService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();

    this.listingService
      .toggleFavorite(this.listingId!, this.authService.getCurrentUser()!)
      .subscribe((resp) => {
        const [access_token, refresh_token] = getStorage([
          'access_token',
          'refresh_token',
        ]);
        this.authService.setCurrentUser(resp.user, {
          access_token,
          refresh_token,
        });
        if (this.emitReloadListings) this.listingService.emitReloadListings.emit(true);
      });
  };

  hasFavorited(): boolean {
    return this.listingService.isFavorite(
      this.listingId!,
      this.authService.getCurrentUser()?.favoriteIds!
    );
  }
}
