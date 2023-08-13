import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { TextareaComponent } from '../../Inputs/textarea/textarea.component';

@Component({
  selector: 'app-become-an-agent-title',
  standalone: true,
  imports: [CommonModule, TextareaComponent],
  templateUrl: './become-an-agent-title.component.html',
  styleUrls: ['./become-an-agent-title.component.css']
})
export class BecomeAnAgentTitleComponent {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'title' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      title: [
        {
          value: "",
          disabled: false
        },
        [Validators.required, Validators.maxLength(32)]
      ],
    });
  }

}
