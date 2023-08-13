import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css'],
  imports: [CommonModule,],
  standalone: true
})
export class CategoryBoxComponent {

  @Input() icon: string | null = null;
  @Input() label: string | null = null;
  @Input() selectedTab?: string;
  @Input() disabled?: boolean;
  @Input() customTextColor: boolean = false;

  params: any = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private listingService: ListingsService
  ) { }

  ngOnChanges(): void {
    if (this.label) {
      if (this.selectedTab === this.label) this.fliterByCategory(this.selectedTab!);
    }
  }

  fliterByCategory = async (category: string) => {
    if (this.disabled) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab_id: category },
      queryParamsHandling: "merge"
    });

    this.listingService.filterListingsByCategory(category);
  }

}
