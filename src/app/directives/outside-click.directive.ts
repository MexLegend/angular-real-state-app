import { Directive, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[outsideClick]',
  standalone: true
})
export class OutsideClickDirective {

  preventMenuClose: boolean = false;

  @Output() outsideClick: EventEmitter<boolean> = new EventEmitter();

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', () => {
      if (!this.preventMenuClose) {
        this.outsideClick.emit(false);
      }
      this.preventMenuClose = false;
    });
  }

  preventCloseOnClick = () => this.preventMenuClose = true;

  showMenu = (isVisible?: boolean) => {
    if (isVisible) this.outsideClick.emit(true);
  }
}
