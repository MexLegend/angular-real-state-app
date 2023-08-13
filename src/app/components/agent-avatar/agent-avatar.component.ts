import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SafeUser } from 'src/app/types';

interface AvatarIcon {
  icon: string,
  border?: boolean,
}

@Component({
  selector: 'app-agent-avatar',
  templateUrl: './agent-avatar.component.html',
  styleUrls: ['./agent-avatar.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class AgentAvatarComponent {

  @Input() agent?: SafeUser;
  @Input() avatarSize: string = "h-14 w-14";
  @Input() icon?: AvatarIcon;
  @Input() customIcon: TemplateRef<any> | null = null;
  @Input() disabled: boolean = false;
  @Input() navigate: boolean = true;

  defaultImage: string = "assets/images/placeholder.jpg";

  constructor(private router: Router) { }

  handleClick = () => {
    if (this.navigate) this.router.navigate(['/agents/' + this.agent!.id]);
    else this.scrollToAgentSection();
  }

  scrollToAgentSection(): void {
    const element = document.getElementById("listingAgent");
    var headerOffset = 80;
    var elementPosition = element!.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;

    window!.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

}
