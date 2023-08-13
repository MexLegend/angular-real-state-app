import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class HeadingComponent {

  @Input() center?: boolean;
  @Input() subtitle?: string;
  @Input() title: string | undefined = undefined;
  @Input() titleSize: string = "text-3xl";

}
