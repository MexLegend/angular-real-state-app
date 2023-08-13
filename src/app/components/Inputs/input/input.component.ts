import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

export type InputType = "email" | "number" | "password" | "text";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe],
  standalone: true
})
export class InputComponent {

  @Input() errors: any
  @Input() formatPrice?: boolean;
  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string | null = null;
  @Input() label: string | null = null;
  @Input() required: boolean = false;
  @Input() type?: InputType;

}
