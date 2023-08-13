import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginAction, ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormErrorBoxComponent } from 'src/app/components/form-error-box/form-error-box.component';

export interface LoginDialogData {
  loginAction?: LoginAction;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    HeadingComponent,
    InputComponent,
    FormErrorBoxComponent
  ],
  standalone: true,
})
export class LoginModalComponent {

  @Input() data?: LoginDialogData;

  authErrorSub$?: Subscription;
  formChangesSub$?: Subscription;

  loginAction: LoginAction = 'Login';
  errors: boolean = false;
  form: FormGroup;
  showRegisterSuccessMessage: boolean = false;
  authError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.initForm();
    this.handleError();
  }

  ngAfterViewInit(): void {
    this.loginAction = this.data!.loginAction!;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.authErrorSub$?.unsubscribe();
    this.formChangesSub$?.unsubscribe();
  }

  handleClose = () => {
    this.modalService.toggleModal.emit(false);
  };

  handleSubmit = () => {
    this.form.disable();

    if (this.loginAction === 'Register') {
      this.userService.registerUser(this.form.value).subscribe((resp) => {
        this.form = this.initForm();
        this.showRegisterSuccessMessage = true;
      });
    } else {
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe((resp) => {
          this.handleClose();
        });
    }
  };

  initForm(): FormGroup {
    return this.fb.group({
      name: [{ value: '', disabled: false }],
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      password: [{ value: '', disabled: false }, Validators.required],
    });
  }

  handleHideErrors() {
    const formChangesSub$ = this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.authError = false;
        formChangesSub$.unsubscribe();
      });
  }

  handleModalAction(action: LoginAction) {
    this.loginAction = action;
    this.showRegisterSuccessMessage = false;
    this.authError = false;
  }

  handleError() {
    this.authErrorSub$ = this.authService.authError.subscribe(() => {
      this.authError = true;
      this.form.enable();
      this.handleHideErrors();
    });
  }
}
