import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

@Component({
  selector: 'app-price-counter',
  standalone: true,
  imports: [CommonModule, FormControlPipe, ReactiveFormsModule],
  templateUrl: './price-counter.component.html',
  styleUrls: ['./price-counter.component.css']
})
export class PriceCounterComponent {

  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() controlName: string = "";
  @Input() min: number = 0;
  @Input() max: number = 9999999;
  @Input() step: number = 1;
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = "$00";
  @Input() inputClasses?: string = "h-24 rounded-xl font-bold";
  @Input() buttonClasses?: string = "h-12 w-12";

  constructor() {
  }

  decrement() {
    let value = this.formGroupRef.controls[this.controlName].value;
    if (value > this.max) value = this.max;
    else value -= this.step;
    this.formGroupRef.controls[this.controlName].patchValue(value);
  }

  increment() {
    let value = this.formGroupRef.controls[this.controlName].value;
    if (value < this.min) value = this.min;
    else value += this.step;
    this.formGroupRef.controls[this.controlName].patchValue(value);
  }
}
