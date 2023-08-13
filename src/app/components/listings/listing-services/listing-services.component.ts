import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-services',
  templateUrl: './listing-services.component.html',
  styleUrls: ['./listing-services.component.css']
})
export class ListingServicesComponent {

  @Input() amenities?: string[] = [];

}
