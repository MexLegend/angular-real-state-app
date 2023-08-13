import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFnsModule } from 'ngx-date-fns';

import { InputComponent } from './Inputs/input/input.component';
import { ContainerComponent } from './container/container.component';
import { ListingCardComponent } from './listings/listing-card/listing-card.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { HeadingComponent } from './heading/heading.component';
import { ButtonComponent } from './button/button.component';
import { HeartButtonComponent } from './heart-button/heart-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './navbar/search/search.component';
import { UserMenuComponent } from './navbar/user-menu/user-menu.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuItemComponent } from './navbar/menu-item/menu-item.component';
import { ToasterComponent } from './toaster/toaster.component';
import { CategoriesComponent } from './navbar/categories/categories.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { AgentTagComponent } from './agent-tag/agent-tag.component';
import { ListingActionsComponent } from './listings/listing-actions/listing-actions.component';
import { ListingHeroComponent } from './listings/listing-hero/listing-hero.component';
import { ListingStickyComponent } from './listings/listing-sticky/listing-sticky.component';
import { ListingNavbarComponent } from './listings/listing-navbar/listing-navbar.component';
import { ListingDetailsComponent } from './listings/listing-details/listing-details.component';
import { ListingServicesComponent } from './listings/listing-services/listing-services.component';
import { ListingLocationComponent } from './listings/listing-location/listing-location.component';
import { ListingAgentsComponent } from './listings/listing-agents/listing-agents.component';
import { AgentAvatarComponent } from './agent-avatar/agent-avatar.component';

import { AgentContactBoxComponent } from './agent-contact-box/agent-contact-box.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { FooterComponent } from './footer/footer.component';
import { SafeUserPipe } from '../pipes/safe-user.pipe';
import { StickyCardComponent } from './sticky-card/sticky-card.component';
import { SwiperComponent } from './swiper/swiper.component';

import { ReviewComponent } from './review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '../pipes/form-control.pipe';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { HeroComponent } from '../modals/hero/hero.component';
import { ContactComponent } from '../modals/contact/contact.component';
import { SearchMenuComponent } from './navbar/search-menu/search-menu.component';
import { OutsideClickDirective } from '../directives/outside-click.directive';
import { SafeDatePipe } from '../pipes/safe-date.pipe';

@NgModule({
  declarations: [
    EmptyStateComponent,
    NavbarComponent,
    UserMenuComponent,
    AvatarComponent,
    ToasterComponent,
    CategoriesComponent,
    AgentTagComponent,
    ListingActionsComponent,
    ListingHeroComponent,
    ListingStickyComponent,
    ListingNavbarComponent,
    ListingDetailsComponent,
    ListingServicesComponent,
    ListingLocationComponent,
    ListingAgentsComponent,
    AgentContactBoxComponent,
    IconButtonComponent,
    FooterComponent,
    StickyCardComponent,
    ReviewComponent
  ],
  imports: [
    AgentAvatarComponent,
    CategoryBoxComponent,
    ContainerComponent,
    MenuItemComponent,
    CommonModule,
    LogoComponent,
    RouterModule,
    DateFnsModule,
    SafeUserPipe,
    FormControlPipe,
    ReactiveFormsModule,
    ButtonComponent,
    HeadingComponent,
    InputComponent,
    ListingCardComponent,
    LoginModalComponent,
    HeroComponent,
    SwiperComponent,
    ContactComponent,
    HeartButtonComponent,
    SearchMenuComponent,
    OutsideClickDirective,
    SearchComponent,
    SafeDatePipe
  ],
  exports: [
    InputComponent,
    ContainerComponent,
    ListingCardComponent,
    EmptyStateComponent,
    HeadingComponent,
    NavbarComponent,
    LogoComponent,
    SearchComponent,
    UserMenuComponent,
    AvatarComponent,
    ButtonComponent,
    ToasterComponent,
    AgentTagComponent,
    ListingActionsComponent,
    ListingHeroComponent,
    ListingStickyComponent,
    ListingNavbarComponent,
    ListingDetailsComponent,
    ListingServicesComponent,
    ListingLocationComponent,
    ListingAgentsComponent,
    AgentAvatarComponent,
    AgentContactBoxComponent,
    FooterComponent,
    StickyCardComponent,
    SwiperComponent,
    ReviewComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
