import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-navbar',
  templateUrl: './listing-navbar.component.html',
  styleUrls: ['./listing-navbar.component.css']
})
export class ListingNavbarComponent {

  @Input() show: boolean = false;

  constructor() { }

  handleClick(elementId: string): void {
    const element = document.getElementById(elementId);
    var headerOffset = 80;
    var elementPosition = element!.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;

    window!.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

}
