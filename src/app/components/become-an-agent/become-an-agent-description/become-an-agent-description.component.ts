import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { TextareaComponent } from '../../Inputs/textarea/textarea.component';

@Component({
  selector: 'app-become-an-agent-description',
  standalone: true,
  imports: [CommonModule, TextareaComponent],
  templateUrl: './become-an-agent-description.component.html',
  styleUrls: ['./become-an-agent-description.component.css']
})
export class BecomeAnAgentDescriptionComponent {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'description' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      description: [
        {
          value: "",
          disabled: false
        },
        [Validators.required, Validators.maxLength(500)]
      ],
    });
  }

}
