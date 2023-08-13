import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { MapboxService } from 'src/app/services/mapbox.ts.service';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {

  @Input() subtitle?: string = "Try changing or removing some of your filters.";
  @Input() title?: string = "No exact matches";

  constructor(
    private listingService: ListingsService,
    private mapboxService: MapboxService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  handleResetCategories = () => {
    this.router.navigate(["/"]);

    this.mapboxService.emitSetSearchInputValue.emit({ placeName: "" });

    this.listingService.filterListingsByCategory('House');
  }

}
