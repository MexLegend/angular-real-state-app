import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { categories } from 'src/app/mocks/categories';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { CheckboxGroupComponent } from '../../Inputs/checkbox-group/checkbox-group.component';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-become-an-agent-structure',
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent],
  templateUrl: './become-an-agent-structure.component.html',
  styleUrls: ['./become-an-agent-structure.component.css']
})
export class BecomeAnAgentStructureComponent {

  @Input() categories: Category[] = categories;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reactiveFormService: ReactiveFormService,
    private becomeAnAgentService: BecomeAnAgentService
  ) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'structure' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group(
      categories.map(category => (this.formBuilder.group(
        {
          value: false,
          disabled: false,
          category: category
        }
      ))),
      {
        validators: this.reactiveFormService.atLeastOneSelected
      }
    );
  }

}
