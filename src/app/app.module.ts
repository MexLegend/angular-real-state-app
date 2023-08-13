import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { register } from 'swiper/element/bundle';

import { AppRoutingModule } from './app-routing.module';
import { ModalsModule } from './modals/modals.module';

import { environment } from '../environments/environment';
import { SafeUserPipe } from './pipes/safe-user.pipe';
import { SwiperDirective } from './directives/swiper.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from './components/components.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { FloatingFooterComponent } from './components/listings/floating-footer/floating-footer.component';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { TOKEN_PROVIDER } from './interceptors/token.interceptor';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MyPropertiesComponent } from './pages/my-properties/my-properties.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

register();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListingsComponent,
    AgentsComponent,
    FavoritesComponent,
    MyPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalsModule,
    ComponentsModule,
    HttpClientModule,
    SafeUserPipe,
    SwiperDirective,
    FloatingFooterComponent,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX_TOKEN,
    }),
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' }),
    MapboxComponent,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [NgxMapboxGLModule, TOKEN_PROVIDER],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
