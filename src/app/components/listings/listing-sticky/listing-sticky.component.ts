import { Component, Input } from '@angular/core';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-sticky',
  templateUrl: './listing-sticky.component.html',
  styleUrls: ['./listing-sticky.component.css'],
})
export class ListingStickyComponent {

  @Input() listing?: Listing;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  handleClick = () => {
    const isLoggedIn = !!this.authService.getCurrentUser();

    this.modalService.setModalData({
      component: isLoggedIn ? ContactComponent : LoginModalComponent,
      title: isLoggedIn ? '' : 'Login',
      data: { loginAction: 'Login', agent: this.listing?.user },
      maxWidth: 'max-w-[600px]',
      enableClose: true,
    });
  };
}
