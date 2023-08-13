import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../container/container.component';
import { Router } from '@angular/router';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { StepRoute, stepsRoutes } from 'src/app/mocks/steps';
import { SteperPipe } from 'src/app/pipes/steper.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types/listing';

interface CurrentStepValifity {
  isValid: boolean;
  formData?: {
    [key: string]: any;
  };
}

export type StepperAction = "Publish" | "Update";

@Component({
  selector: 'app-become-an-agent-floating-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent, SteperPipe],
  templateUrl: './become-an-agent-floating-footer.component.html',
  styleUrls: ['./become-an-agent-floating-footer.component.css'],
})
export class BecomeAnAgentFloatingFooterComponent {

  formSubscription$?: Subscription;
  becomeAnAgentServiceSub$?: Subscription;
  routerEventsSubscription$?: Subscription;
  getStepperDataSub$?: Subscription;

  stepperAction: StepperAction = "Publish";
  currentRoute: string = '';
  stepsRoutes: StepRoute[] = stepsRoutes;
  stepperListingData?: Listing;
  isFormValid: boolean = false;
  isSaving: boolean = false;

  constructor(
    private router: Router,
    private becomeAnAgentService: BecomeAnAgentService,
    private listingService: ListingsService,
    private cookieService: CookieService
  ) {
    this.getStepperAction();
    this.checkFormsValidity();
    this.getStepperData();
  }

  ngOnDestroy(): void {
    this.becomeAnAgentServiceSub$?.unsubscribe();
    this.routerEventsSubscription$?.unsubscribe();
    this.getStepperDataSub$?.unsubscribe();
  }

  getStepperAction() {
    this.stepperAction = this.cookieService.get("stepperAction") as StepperAction || "Publish";
  }

  checkCurrentStepValidity(): CurrentStepValifity {
    const currentRouteIndex = this.stepsRoutes.findIndex(
      (elem) => elem.stepRoute === this.currentRoute
    );

    // Check if current step is the first one
    if (currentRouteIndex === 0) return { isValid: true };

    const currentStepFormData = this.cookieService.get(this.currentRoute);

    // Check if current step is valid
    if (currentStepFormData) {
      return this.getValidStepDataFromCookie(currentStepFormData);
    }

    const { stepRoute } = this.stepsRoutes[currentRouteIndex - 1];
    const isPreviousStepValid = this.cookieService.get(stepRoute);

    // Check if the previous step is valid to allow "Next" button functionallity
    if (isPreviousStepValid) {
      return this.getValidStepDataFromCookie(currentStepFormData);
    }

    const auxStepRoutes: StepRoute[] = [...this.stepsRoutes];

    // Iterate over the "stepsRoutes" array to find the last step completed
    const lastStepCompleted = auxStepRoutes
      .reverse()
      .find((step) => this.cookieService.get(step.stepRoute));

    this.router.navigate([`/become-an-agent/${lastStepCompleted!.stepRoute}`]);

    return { isValid: false };
  }

  checkFormsValidity() {
    this.becomeAnAgentServiceSub$ =
      this.becomeAnAgentService.emitFilterCategory.subscribe(
        async ({ formGroupRef, stepRoute, isStepIntro }) => {
          this.currentRoute = stepRoute!;

          // Await 100 milliseconds to ensure "stepsRoutes" var is inited
          await new Promise((resolve) => setTimeout(resolve, 100));

          const { isValid, formData } = this.checkCurrentStepValidity();

          if (!isValid) return;

          // Save active route step into a the cookie "active-route"
          this.cookieService.set('active-route', stepRoute!);

          // Patch "formGroupRef" with saved data in cookie if exists
          if (formData && !formData['isStepIntro'])
            formGroupRef?.patchValue(formData);

          if (
            isStepIntro ||
            (this.currentRoute === stepRoute && formGroupRef?.valid)
          ) {
            this.isFormValid = true;
            this.cookieService.set(
              this.currentRoute,
              isStepIntro
                ? JSON.stringify({ isStepIntro: true })
                : JSON.stringify(formGroupRef?.value)
            );
          } else this.isFormValid = false;

          // Return If "formGroupRef" is undefined
          if (!formGroupRef || !stepRoute) return;

          // Unsubscribe any possible subscription in "formSubscription$" before resubscribing to incoming one
          this.formSubscription$?.unsubscribe();
          this.handleFormChanges(formGroupRef, stepRoute);
        }
      );
  }

  handleStepperAction() {
    if (this.stepperAction === "Publish") this.createListing();
    else this.updateListing();
  }

  createListing() {

    this.isSaving = true;
    this.listingService.emitIsSaving.emit(true);

    const createListingSub$ = this.listingService
      .createListing(this.stepperListingData!)
      .subscribe(({ listing }) => {
        this.router.navigate(['/']);
        this.isSaving = false;
        this.listingService.emitIsSaving.emit(false);
        this.stepsRoutes.forEach((step) => {
          this.cookieService.delete(step.stepRoute);
        });
        createListingSub$.unsubscribe();
      });
  }

  updateListing() {

    this.isSaving = true;
    this.listingService.emitIsSaving.emit(true);

    const listingId = this.cookieService.get("listingId");

    const updateListingSub$ = this.listingService
      .updateListing(this.stepperListingData!, listingId)
      .subscribe(({ listing }) => {

        this.router.navigate(['/']);
        this.isSaving = false;
        this.listingService.emitIsSaving.emit(false);

        this.stepsRoutes.forEach((step) => {
          this.cookieService.delete(step.stepRoute);
        });

        updateListingSub$.unsubscribe();
      });
  }

  getStepperData() {
    this.getStepperDataSub$ = this.listingService.emitStepperData.subscribe(
      (listing) => {
        this.stepperListingData = listing;
      }
    );
  }

  getValidStepDataFromCookie(currentStepFormData: string): CurrentStepValifity {
    return {
      isValid: true,
      formData: currentStepFormData ? JSON.parse(currentStepFormData) : null,
    };
  }

  handleStep(isNext: boolean) {
    const currentRouteIndex = this.stepsRoutes.findIndex(
      (elem) => elem.stepRoute === this.currentRoute
    );
    const stepRoute = isNext
      ? this.stepsRoutes[currentRouteIndex + 1].stepRoute
      : this.stepsRoutes[currentRouteIndex + -1].stepRoute;
    this.router.navigate([`/become-an-agent/${stepRoute}`]);
  }

  handleFormChanges(form: FormGroup, stepRoute: string) {
    this.formSubscription$ = form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        if (this.currentRoute === stepRoute && form.valid)
          this.isFormValid = true;
        else this.isFormValid = false;

        if (form.valid)
          this.cookieService.set(this.currentRoute, JSON.stringify(form.value));
      });
  }
}
