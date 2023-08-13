import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { BecomeAnAgentComponent } from './pages/become-an-agent/become-an-agent.component';
import { AboutYourHomeComponent } from './components/become-an-agent/about-your-home/about-your-home.component';
import { BecomeAnAgentStructureComponent } from './components/become-an-agent/become-an-agent-structure/become-an-agent-structure.component';
import { BecomeAnAgentLocationComponent } from './components/become-an-agent/become-an-agent-location/become-an-agent-location.component';
import { BecomeAnAgentFeaturesComponent } from './components/become-an-agent/become-an-agent-features/become-an-agent-features.component';
import { BecomeAnAgentStandOutComponent } from './components/become-an-agent/become-an-agent-stand-out/become-an-agent-stand-out.component';
import { BecomeAnAgentAmenitiesComponent } from './components/become-an-agent/become-an-agent-amenities/become-an-agent-amenities.component';
import { BecomeAnAgentPhotosComponent } from './components/become-an-agent/become-an-agent-photos/become-an-agent-photos.component';
import { BecomeAnAgentTitleComponent } from './components/become-an-agent/become-an-agent-title/become-an-agent-title.component';
import { BecomeAnAgentDescriptionComponent } from './components/become-an-agent/become-an-agent-description/become-an-agent-description.component';
import { BecomeAnAgentFinishSetupComponent } from './components/become-an-agent/become-an-agent-finish-setup/become-an-agent-finish-setup.component';
import { BecomeAnAgentPriceComponent } from './components/become-an-agent/become-an-agent-price/become-an-agent-price.component';
import { BecomeAnAgentReceiptComponent } from './components/become-an-agent/become-an-agent-receipt/become-an-agent-receipt.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { AuthGuard } from './guards/auth.guard';
import { MyPropertiesComponent } from './pages/my-properties/my-properties.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { hideSearchFilter: false } },
  { path: 'listings/:id', component: ListingsComponent },
  { path: 'agents/:id', component: AgentsComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties',
    component: MyPropertiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'become-an-agent',
    component: BecomeAnAgentComponent,
    data: { hideNavbar: true },
    children: [
      {
        path: "",
        redirectTo: "about-your-home",
        pathMatch: "full"
      },
      {
        path: "about-your-home",
        component: AboutYourHomeComponent
      },
      {
        path: "structure",
        component: BecomeAnAgentStructureComponent
      },
      {
        path: "location",
        component: BecomeAnAgentLocationComponent
      },
      {
        path: "features",
        component: BecomeAnAgentFeaturesComponent
      },
      {
        path: "stand-out",
        component: BecomeAnAgentStandOutComponent
      },
      {
        path: "amenities",
        component: BecomeAnAgentAmenitiesComponent
      },
      {
        path: "photos",
        component: BecomeAnAgentPhotosComponent
      },
      {
        path: "title",
        component: BecomeAnAgentTitleComponent
      },
      {
        path: "description",
        component: BecomeAnAgentDescriptionComponent
      },
      {
        path: "finish-setup",
        component: BecomeAnAgentFinishSetupComponent
      },
      {
        path: "price",
        component: BecomeAnAgentPriceComponent
      },
      {
        path: "receipt",
        component: BecomeAnAgentReceiptComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent, data: { hideNavbar: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
