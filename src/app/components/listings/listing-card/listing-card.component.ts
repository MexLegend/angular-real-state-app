import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, ViewEncapsulation } from '@angular/core';
import { SafeListing } from 'src/app/types';
import { HeartButtonComponent } from '../../heart-button/heart-button.component';
import { SwiperComponent } from '../../swiper/swiper.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { MatMenuModule } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { amenities as amenitiesList } from 'src/app/mocks/amenities';
import { categories as categoriesList } from 'src/app/mocks/categories';
import { SafeLocation } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
  imports: [
    CommonModule,
    HeartButtonComponent,
    SwiperComponent,
    RouterModule,
    MatMenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ListingCardComponent {

  @Input() actionId?: string;
  @Input() actionLabel?: string;
  @Input() data: SafeListing | null = null;
  @Input() disabled?: boolean;
  @Input() onAction?: (id: string) => void;
  @Input() showFavoritesBtn: boolean = true;
  @Input() showSwiper: boolean = true;
  @Input() showDetails: boolean = true;
  @Input() showActions: boolean = false;
  @Input() emitReloadListings: boolean = false;

  price: string = '';

  constructor(
    private readonly authService: AuthService,
    private listingService: ListingsService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.price = this.data?.price || '';
  }

  handleCancel(e: MouseEvent) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.onAction?.(this.actionId!);
  }

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  async handleUpdateListing() {
    const { id, amenities, categories, location, features, images, title, description, price }: SafeListing = this.data!;

    const formatedAmenities = amenitiesList.map(amenity => ({
      value: amenities.includes(amenity.label),
      disabled: false,
      amenity
    }));

    const formatedCategories = categoriesList.map(category => ({
      value: categories.includes(category.label),
      disabled: false,
      category
    }));

    const { listingId, id: locationId, ...formatedLocation }: SafeLocation = location as SafeLocation;

    // publicId change this property in the model
    const formatedImages = images.map(image => ({ public_id: image.public_id, url: image.url }))

    this.cookieService.set("listingId", JSON.stringify(id));
    this.cookieService.set("amenities", JSON.stringify(formatedAmenities));
    this.cookieService.set("structure", JSON.stringify(formatedCategories));
    this.cookieService.set("location", JSON.stringify({ location: formatedLocation }));
    this.cookieService.set("features", JSON.stringify(features));
    this.cookieService.set("photos", JSON.stringify({ images: formatedImages }));
    this.cookieService.set("title", JSON.stringify({ title }));
    this.cookieService.set("description", JSON.stringify({ description }));
    this.cookieService.set("price", JSON.stringify({ price }));
    this.cookieService.set("stepperAction", "Update");

    this.router.navigate(["/become-an-agent"]);
  }

  async handleDeleteListing() {
    const listing: SafeListing = this.data!;

    const deleteListingSub$ = this.listingService.deleteListing(listing.id!).subscribe(() => {
      this.listingService.emitReloadListings.emit();
      deleteListingSub$.unsubscribe();
    });
  }

}
