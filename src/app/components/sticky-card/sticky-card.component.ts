import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-card',
  templateUrl: './sticky-card.component.html',
  styleUrls: ['./sticky-card.component.css']
})
export class StickyCardComponent {

  @Input() customClasses: string = "";

}
