import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  closeModalSubscription$?: Subscription;

  showModal: boolean = false;
  showDropdown: boolean = false;
  documentBody: HTMLElement | null = null;

  constructor(private authService: AuthService, private modalService: ModalService) {
    this.authService.loadStorageUser();
    this.documentBody = document.querySelector('body');
    this.handleToggleModal();
  }

  ngOnDestroy(): void {
    this.closeModalSubscription$?.unsubscribe();
  }

  handleToggleModal() {
    this.closeModalSubscription$ = this.modalService.toggleModal.subscribe((isShowing) => {
      if (isShowing) this.showModal = isShowing;
      else setTimeout(() => {
        this.documentBody?.classList.remove('overflow-clip');
        this.showModal = isShowing;
      }, 400);
    });
  }
}
