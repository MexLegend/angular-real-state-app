import { ChangeDetectorRef, Component } from '@angular/core';
import { Listing } from 'src/app/types/listing';

import { ListingsService } from 'src/app/services/listings.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MapboxService } from 'src/app/services/mapbox.ts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  categoryEmiterSubscription$?: Subscription;
  filterLocationSub$?: Subscription;

  listings: Listing[] = [];
  isDrawerOpen: boolean = false;
  isLoading: boolean = true;
  isFiltered: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private listinsgService: ListingsService,
    private mapboxService: MapboxService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isDrawerOpen = param['drawer_open']
        ? JSON.parse(param['drawer_open'])
        : false;
    });
    this.getListingsByCategory();
    this.handleFilterListings();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.categoryEmiterSubscription$?.unsubscribe();
    this.filterLocationSub$?.unsubscribe();
  }

  toogleDrawer(e: MouseEvent) {
    e.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { drawer_open: !this.isDrawerOpen },
      queryParamsHandling: 'merge',
    });
  }

  getListingsByCategory() {
    this.categoryEmiterSubscription$ =
      this.listinsgService.emitFilterCategory.subscribe(
        async ({ isLoading, listings }) => {

          this.listings = listings?.length ? [...listings] : [];
          this.isLoading = isLoading;

          this.changeDetector.detectChanges();
        }
      );
  }

  handleFilterListings() {
    this.filterLocationSub$ = this.mapboxService.emitSelectedLocation.subscribe(({ location }) => {
      const locationParams = location.placeName?.split(",").map(elem => elem.trim());
      this.listinsgService.filterListingsByCategory("", locationParams);
    });
  }
}
