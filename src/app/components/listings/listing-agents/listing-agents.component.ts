import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-listing-agents',
  templateUrl: './listing-agents.component.html',
  styleUrls: ['./listing-agents.component.css']
})
export class ListingAgentsComponent {

  @Input() agent?: SafeUser;

}
