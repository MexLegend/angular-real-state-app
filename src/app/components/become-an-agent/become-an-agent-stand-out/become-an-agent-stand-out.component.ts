import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-stand-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-an-agent-stand-out.component.html',
  styleUrls: ['./become-an-agent-stand-out.component.css']
})
export class BecomeAnAgentStandOutComponent {

  constructor(private becomeAnAgentService: BecomeAnAgentService) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isStepIntro: true, stepRoute: "stand-out" });
  }

}
