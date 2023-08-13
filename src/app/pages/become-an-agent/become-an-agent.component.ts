import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { BecomeAnAgentFloatingFooterComponent } from 'src/app/components/become-an-agent/become-an-agent-floating-footer/become-an-agent-floating-footer.component';
import { BecomeAnAgentNavbarComponent } from 'src/app/components/become-an-agent/become-an-agent-navbar/become-an-agent-navbar.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProgressLoaderComponent } from 'src/app/components/progress-loader/progress-loader.component';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-become-an-agent',
  templateUrl: './become-an-agent.component.html',
  styleUrls: ['./become-an-agent.component.css'],
  imports: [
    CommonModule,
    ContainerComponent,
    BecomeAnAgentNavbarComponent,
    BecomeAnAgentFloatingFooterComponent,
    RouterModule,
    ProgressLoaderComponent
  ],
  standalone: true
})
export class BecomeAnAgentComponent {

  isSavingSub$?: Subscription;

  isSaving: boolean = false;

  constructor(private listingService: ListingsService) {
    this.handleIsLoading();
  }

  ngOnDestroy(): void {
    this.isSavingSub$?.unsubscribe();
  }

  handleIsLoading() {
    this.listingService.emitIsSaving.subscribe((isSaving) => {
      this.isSaving = isSaving;
    });
  }

}
