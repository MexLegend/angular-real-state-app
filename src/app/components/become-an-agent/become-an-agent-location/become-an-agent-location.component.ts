import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../navbar/search/search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { MapboxService } from 'src/app/services/mapbox.ts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-become-an-agent-location',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './become-an-agent-location.component.html',
  styleUrls: ['./become-an-agent-location.component.css']
})
export class BecomeAnAgentLocationComponent {

  formSubscription$?: Subscription;
  getLocationSub$?: Subscription;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private becomeAnAgentService: BecomeAnAgentService,
    private mapboxService: MapboxService
  ) {
    this.form = this.initForm();
    this.setInitialSearchInputVlue();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'location' });
    this.getSelectedLocation();
  }

  ngOnDestroy(): void {
    this.formSubscription$?.unsubscribe();
    this.getLocationSub$?.unsubscribe();
  }

  getSelectedLocation() {
    this.getLocationSub$ = this.mapboxService.emitSelectedLocation.subscribe(({ location }) => {
      this.form.setValue({ location });
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      location: [
        {
          value: null,
          disabled: false
        },
        Validators.required
      ]
    });
  }

  setInitialSearchInputVlue() {

    setTimeout(() => {
      const initialLocationValue = this.form.value.location;
      this.mapboxService.emitSetSearchInputValue.emit(initialLocationValue || { placeName: "" })
    }, 300);

  }

}
