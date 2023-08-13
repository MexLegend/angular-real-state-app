import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() controlName: string = "";
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 50;
  @Input() readOnly: boolean = true;

  constructor() {
  }

  decrement() {
    if (this.value === this.min) return;
    this.value--;
    this.formGroupRef.controls[this.controlName].patchValue(this.value);
  }

  increment() {
    if (this.value === this.max) return;
    this.value++;
    this.formGroupRef.controls[this.controlName].patchValue(this.value);
  }
}
