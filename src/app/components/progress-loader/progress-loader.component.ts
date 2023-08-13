import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProgressLoaderComponent {

  @Input() size: string = "w-[25px] h-[25px]";
  @Input() color: string = "text-white";
  @Input() bgColor: string = "#E5E7EB";

}
