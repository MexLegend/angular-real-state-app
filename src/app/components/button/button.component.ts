import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ButtonComponent {

  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() label: string = "";
  @Input() onClick: (e: MouseEvent) => void = () => { };
  @Input() outline?: boolean;
  @Input() small?: boolean;

}
