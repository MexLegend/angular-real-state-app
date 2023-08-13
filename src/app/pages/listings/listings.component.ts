import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
})
export class ListingsComponent {
  
  @ViewChild('listingInfo', { static: false })
  listingInfoSection?: ElementRef<HTMLDivElement>;

  listing?: Listing;
  showListingNavbar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {
    this.route.params.subscribe(async (param) => {
      this.listingsService.getListingById(param['id']).subscribe((listing) => {
        this.listing = listing;
      });
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const listingInfoSectionElement = this.listingInfoSection?.nativeElement;

    if (!listingInfoSectionElement) return;

    if (window.scrollY >= listingInfoSectionElement.offsetTop) {
      this.showListingNavbar = true;
    } else {
      this.showListingNavbar = false;
    }
  }
}
