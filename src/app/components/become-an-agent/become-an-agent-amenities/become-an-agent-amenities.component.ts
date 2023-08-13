import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxGroupComponent } from '../../Inputs/checkbox-group/checkbox-group.component';
import { Amenity } from 'src/app/types/amenity';
import { amenities } from 'src/app/mocks/amenities';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-amenities',
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent],
  templateUrl: './become-an-agent-amenities.component.html',
  styleUrls: ['./become-an-agent-amenities.component.css']
})
export class BecomeAnAgentAmenitiesComponent {

  @Input() amenities: Amenity[] = amenities;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reactiveFormService: ReactiveFormService,
    private becomeAnAgentService: BecomeAnAgentService
  ) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'amenities' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group(
      amenities.map(amenity => (this.formBuilder.group(
        {
          value: false,
          disabled: false,
          amenity
        }
      ))),
      {
        validators: this.reactiveFormService.atLeastOneSelected
      }
    );
  }

}
