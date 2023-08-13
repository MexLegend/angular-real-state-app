import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class MenuItemComponent {

  @Input() routerLink?: string | null = null;
  @Input() label: string | null = null;
  @Input() isBold: boolean = false;

}
