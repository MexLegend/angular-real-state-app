import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { StepRoute, stepsRoutes } from 'src/app/mocks/steps';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/types/category';
import { Amenity } from 'src/app/types/amenity';
import { Listing } from 'src/app/types/listing';
import { SafePricePipe } from 'src/app/pipes/safe-price.pipe';
import { ListingsService } from 'src/app/services/listings.service';

interface SelectedCategory {
  disabled: boolean;
  value: boolean;
  category: Category;
}

interface SelectedAmenity {
  disabled: boolean;
  value: boolean;
  amenity: Amenity;
}

@Component({
  selector: 'app-become-an-agent-receipt',
  standalone: true,
  imports: [CommonModule, SafePricePipe],
  templateUrl: './become-an-agent-receipt.component.html',
  styleUrls: ['./become-an-agent-receipt.component.css']
})
export class BecomeAnAgentReceiptComponent {

  stepsRoutes: StepRoute[] = stepsRoutes;
  stepperData?: Listing;

  constructor(
    private becomeAnAgentService: BecomeAnAgentService,
    private listingService: ListingsService,
    private cookieService: CookieService
  ) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isLastStep: true, stepRoute: "receipt" });
    this.getStepperData();
  }

  // Get data from all steps
  getStepperData() {
    const stepperData = this.stepsRoutes.map((step, index) => {

      if (step.isStepIntro) return null;

      const stepData = this.cookieService.get(step.stepRoute);

      const parsedData = stepData ? JSON.parse(stepData) : null

      // Check if current iteration is the "structure" step
      if (index === 1) {

        // Type categories list from current "parsedData"
        const categoriesList: SelectedCategory[] = parsedData;
        const categories: string[] = [];

        // Iterate over each category and filter selected ones "value = true" and retrieve "label" property
        for (const key in categoriesList) {
          if (categoriesList[key].value) categories.push(categoriesList[key].category.label)
        }

        return { categories };
      }

      // Check if current iteration is the "features" step
      if (index === 3) {
        return { features: parsedData };
      }

      // Check if current iteration is the "amenities" step
      if (index === 5) {

        // Type amenities list from current "parsedData"
        const amenitiesList: SelectedAmenity[] = parsedData;
        const amenities: string[] = [];

        // Iterate over each amenity and filter selected ones "value = true" and retrieve "label" property
        for (const key in amenitiesList) {
          if (amenitiesList[key].value) amenities.push(amenitiesList[key].amenity.label)
        }

        return { amenities };
      }

      return parsedData;
    }).filter(elem => elem);

    const mergedStepperData = Object.assign({}, ...stepperData);

    this.stepperData = mergedStepperData;

    this.listingService.emitStepperData.emit(mergedStepperData);

  }
}
