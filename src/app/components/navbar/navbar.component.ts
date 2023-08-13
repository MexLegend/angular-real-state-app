import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @ViewChild('navbar', { static: false }) navbar?: ElementRef<HTMLElement>;

  currentPage: string = '';
  hideNavbar: boolean = true;
  hideSearchFilter: boolean = true;
  isScrolling: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.router.url.split('?')[0];
      }

      if (event instanceof ActivationEnd) {
        this.hideNavbar = event.snapshot.data['hideNavbar'] || false;
        const hideSearchFilterData = event.snapshot.data['hideSearchFilter'];
        this.hideSearchFilter = hideSearchFilterData !== undefined ? hideSearchFilterData : true;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbarElement = this.navbar?.nativeElement;
    if (!navbarElement) return;

    if (window.scrollY > navbarElement.clientHeight - 160) {
      this.isScrolling = true;
    } else {
      this.isScrolling = false;
    }
  }
}
