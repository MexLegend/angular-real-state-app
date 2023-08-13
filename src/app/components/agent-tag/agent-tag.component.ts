import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-agent-tag',
  templateUrl: './agent-tag.component.html',
  styleUrls: ['./agent-tag.component.css']
})
export class AgentTagComponent {

  @Input() icon: string | null = null;
  @Input() customIcon: TemplateRef<any> | null = null;
  @Input() customClasses?: string;
  @Input() tag: string | null = null;

}
