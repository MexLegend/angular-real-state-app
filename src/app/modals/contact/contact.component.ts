import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextareaComponent } from 'src/app/components/Inputs/textarea/textarea.component';
import { AgentAvatarComponent } from 'src/app/components/agent-avatar/agent-avatar.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { SafeUser } from 'src/app/types';

interface DialogData {
  loginAction: string;
  agent: SafeUser;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    HeadingComponent,
    TextareaComponent,
    AgentAvatarComponent,
  ],
  standalone: true,
})
export class ContactComponent {
  
  @Input() data?: DialogData;

  isLoading: boolean = false;
  errors: boolean = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: ModalService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      message: [{ value: '', disabled: false }, Validators.required],
    });
  }

  handleClose = () => {
    this.modalService.toggleModal.emit(false);
  }

  handleSubmit = () => {
    if (this.authService.getCurrentUser())
      this.userService
        .contactAgent(
          this.authService.getCurrentUser()!.email!,
          this.form.value.message
        )
        .subscribe((resp) => {
          this.handleClose();
        });
    this.form.disable();
  };
}
