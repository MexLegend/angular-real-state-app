import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../Inputs/counter/counter.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { InputComponent } from '../../Inputs/input/input.component';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-features',
  standalone: true,
  imports: [CommonModule, CounterComponent, ReactiveFormsModule, FormControlPipe, InputComponent],
  templateUrl: './become-an-agent-features.component.html',
  styleUrls: ['./become-an-agent-features.component.css']
})
export class BecomeAnAgentFeaturesComponent {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'features' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      roomCount: [
        {
          value: 1,
          disabled: false
        },
        Validators.required
      ],
      bathroomCount: [
        {
          value: 1,
          disabled: false
        },
        Validators.required
      ],
      propertyArea: [
        {
          value: 100,
          disabled: false,
        },
        [Validators.min(50), Validators.required]
      ],
    });
  }
}
