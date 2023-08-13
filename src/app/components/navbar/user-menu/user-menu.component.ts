import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { OutsideClickDirective } from 'src/app/directives/outside-click.directive';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginAction, ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {

  @ViewChild(OutsideClickDirective)
  outsideClickDirective?: OutsideClickDirective;

  userFromEmitterSubscription$?: Subscription;
  currentUser?: SafeUser | null = null;
  isOpen: boolean = false;
  loginAction: LoginAction = 'Login';

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getCurrentUser();
    this.getUserFromEmitter();
  }

  @HostListener('window:scroll', ['$event'])
  getScrollHeight() {
    if (window.scrollY > 0 && this.isOpen) this.isOpen = false;
  }

  ngOnDestroy(): void {
    this.userFromEmitterSubscription$?.unsubscribe();
  }

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  };

  onSell = () => {
    const isLoggedIn = !!this.authService.getCurrentUser();

    if (isLoggedIn) {
      this.router.navigate(['/become-an-agent'], {
        relativeTo: this.route,
      });
      this.cookieService.set("stepperAction", "Publish");
    } else {
      this.modalService.setModalData({
        component: LoginModalComponent,
        title: 'Login',
        data: { loginAction: 'Login' },
        maxWidth: 'max-w-[600px]',
        enableClose: true,
      });
    }
  };

  handleSignOut = () => {
    this.authService.logout();
  };

  handleloginModal = (loginAction: LoginAction) => {
    this.toggleOpen();
    this.loginAction = loginAction;

    this.modalService.setModalData({
      component: LoginModalComponent,
      title: loginAction,
      data: { loginAction },
      maxWidth: 'max-w-[600px]',
      enableClose: true,
    });
  };

  getLoginAction = (): LoginAction => {
    return this.loginAction;
  };

  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    this.currentUser = user;
  }

  getUserFromEmitter() {
    this.userFromEmitterSubscription$ = this.authService.userEmitter.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
  }

  preventCloseOnClick() {
    this.outsideClickDirective?.preventCloseOnClick();
  }

  showMenu(isVisible?: boolean) {
    this.outsideClickDirective?.showMenu(isVisible);
  }
}
