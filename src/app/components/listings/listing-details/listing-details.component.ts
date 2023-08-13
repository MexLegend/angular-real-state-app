import { Component, Input } from '@angular/core';
import { SafeListing } from 'src/app/types';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent {

  @Input() listing?: SafeListing;

}
