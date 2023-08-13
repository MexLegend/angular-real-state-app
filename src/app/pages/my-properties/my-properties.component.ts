import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent {

  reloadListingsSub$?: Subscription;

  isLoading: boolean = true;
  properties: Listing[] = [];

  constructor(
    private authService: AuthService,
    private listingsService: ListingsService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.getProperties();
    this.handleReloadListings();
  }

  ngOnDestroy(): void {
    this.reloadListingsSub$?.unsubscribe();
  }

  getProperties() {
    const agentId: string = this.authService.getCurrentUser()?.id || "";

    const getAgentPropertiesSub$ = this.listingsService.getAgentProperties(agentId).subscribe((listings) => {
      this.properties = listings;
      this.isLoading = false;
      getAgentPropertiesSub$.unsubscribe();
    });
  }

  handleReloadListings() {
    this.reloadListingsSub$ = this.listingsService.emitReloadListings.subscribe(() => {
      this.getProperties();
    });
  }

  handleOnSell(){
    this.cookieService.set("stepperAction", "Publish");
    this.router.navigate(["/become-an-agent"]);
  }

}
