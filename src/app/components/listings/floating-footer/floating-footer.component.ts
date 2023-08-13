import { Component, Input, TemplateRef } from '@angular/core';
import { SafeListing } from 'src/app/types';
import { ButtonComponent } from '../../button/button.component';
import { ModalService } from 'src/app/services/modal.service';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { SafeUserPipe } from 'src/app/pipes/safe-user.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';

@Component({
  selector: 'app-floating-footer',
  templateUrl: './floating-footer.component.html',
  styleUrls: ['./floating-footer.component.css'],
  imports: [ButtonComponent, ContactComponent, SafeUserPipe],
  standalone: true
})
export class FloatingFooterComponent {

  @Input() listing?: SafeListing;

  constructor(private authService: AuthService, private modalService: ModalService) { }

  handleClick = () => {
    const isLoggedIn = !!this.authService.getCurrentUser();

    this.modalService.setModalData({
      component: isLoggedIn ? ContactComponent : LoginModalComponent,
      title: isLoggedIn ? '' : 'Login',
      data: { loginAction: 'Login' },
      maxWidth: "max-w-[600px]",
      enableClose: true
    });
  }

}
