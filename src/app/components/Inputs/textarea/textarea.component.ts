import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe],
  standalone: true
})
export class TextareaComponent {

  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string | null = null;
  @Input() label: string | null = null;
  @Input() placeholder: string = " ";
  @Input() required: boolean = false;
  @Input() rows: number = 3;
  @Input() cols: number = 50;
}
