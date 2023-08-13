import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, type ToastType } from 'src/app/services/modal.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {

  type: ToastType = "Warning";
  message: string = "";
  isOpen: boolean = false;
  timeout: ReturnType<typeof setTimeout> = setTimeout(()=> {});

  $toast: Subscription | null = null;;

  constructor(private modalService: ModalService) {
    this.$toast = this.modalService.getToast().subscribe(({ type, message }) => {
      this.type = type;
      this.message = message;
      this.isOpen = true;
      this.closeToastAfterDelay();
    });
  }

  ngOnDestroy(): void {
    this.$toast?.unsubscribe();
  }

  handleOnClick(e: MouseEvent) {
    this.isOpen = false;
    clearTimeout(this.timeout);
  }

  closeToastAfterDelay() {
    this.timeout = setTimeout(() => {
      this.isOpen = false;
    }, 3000);
  }
}
