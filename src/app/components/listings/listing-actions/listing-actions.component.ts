import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-actions',
  templateUrl: './listing-actions.component.html',
  styleUrls: ['./listing-actions.component.css']
})
export class ListingActionsComponent {

  @Input() listingId: string = "";
  @Input() isMobile?: boolean;

}
