import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ContainerComponent {

  @Input() children: TemplateRef<any> | null = null;
  @Input() expandHeight: boolean = false;
  @Input() maxWidth: string = "xl:px-20 md:px-10";

}
