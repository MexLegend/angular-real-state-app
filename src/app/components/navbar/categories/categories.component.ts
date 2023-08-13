import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { categories } from 'src/app/mocks/categories';
import { MapboxService } from 'src/app/services/mapbox.ts.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  @Input() isMainPage: boolean = true;
  @Input() isScrolling: boolean = false;

  getLocationSub$?: Subscription;

  selectedTab: string = "House";
  categories: Category[] = categories;
  isDrawerOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mapboxService: MapboxService
  ) {

    this.route.queryParams.subscribe((param) => {
      this.selectedTab = param['tab_id'] || "House";
      this.isDrawerOpen = param['drawer_open'] && JSON.parse(param['drawer_open']);
    })
    this.handleDisableCategory();
  }

  handleDisableCategory() {
    this.getLocationSub$ = this.mapboxService.emitSelectedLocation.subscribe(() => {
      this.selectedTab = "";
    });
  }
}
