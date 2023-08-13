import { Component, Input } from '@angular/core';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-agent-contact-box',
  templateUrl: './agent-contact-box.component.html',
  styleUrls: ['./agent-contact-box.component.css'],
})
export class AgentContactBoxComponent {
  @Input() agentInfo?: SafeUser;
  @Input() isSticky: boolean = false;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) { }

  handleOpenModal() {

    const isLoggedIn = !!this.authService.getCurrentUser();

    this.modalService.setModalData({
      component: isLoggedIn ? ContactComponent : LoginModalComponent,
      title: isLoggedIn ? '' : 'Login',
      data: { loginAction: 'Login', agent: this.agentInfo },
      maxWidth: "max-w-[600px]",
      enableClose: true
    });
  }
}
