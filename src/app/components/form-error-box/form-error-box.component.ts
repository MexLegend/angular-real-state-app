import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-error-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error-box.component.html',
  styleUrls: ['./form-error-box.component.scss']
})
export class FormErrorBoxComponent {

  @Input() label: string = "";
}
