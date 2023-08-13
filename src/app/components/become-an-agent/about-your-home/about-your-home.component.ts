import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-about-your-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-your-home.component.html',
  styleUrls: ['./about-your-home.component.css']
})
export class AboutYourHomeComponent {

  constructor(private becomeAnAgentService: BecomeAnAgentService) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isStepIntro: true, stepRoute: "about-your-home" });
  }

}
