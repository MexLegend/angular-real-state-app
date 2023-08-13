import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-finish-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-an-agent-finish-setup.component.html',
  styleUrls: ['./become-an-agent-finish-setup.component.css']
})
export class BecomeAnAgentFinishSetupComponent {

  constructor(private becomeAnAgentService: BecomeAnAgentService) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isStepIntro: true, stepRoute: "finish-setup" });
  }

}
