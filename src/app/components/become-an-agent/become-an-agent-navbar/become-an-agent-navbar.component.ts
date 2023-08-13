import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';
import { ContainerComponent } from '../../container/container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-become-an-agent-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ContainerComponent,
    RouterModule
  ],
  templateUrl: './become-an-agent-navbar.component.html',
  styleUrls: ['./become-an-agent-navbar.component.css']
})
export class BecomeAnAgentNavbarComponent {

  isScrolling: boolean = false;

  constructor() {
    setTimeout(() => this.handleContainerScroll(), 100);
  }

  handleContainerScroll() {
    const container = document.getElementById("become-an-agent-container");
    
    container!.addEventListener("scroll", () => {

      if (container!.scrollTop > 1) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
      }
    });
  }

}
