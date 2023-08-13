import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalContentDirective } from 'src/app/directives/modal-content.directive';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalContentDirective],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  @ViewChild(ModalContentDirective, { static: true }) modalContent!: ModalContentDirective;

  modalDataSubscription$?: Subscription;
  closeModalSubscription$?: Subscription;

  title: string = "";
  showModal: boolean = false;
  maxWidth: string = "max-sm:max-w-[95%] max-w-[80%] lg:max-w-[800px]";
  closeOnBackdropClick?: boolean = false;
  isExpanded?: boolean = false;

  documentBody: HTMLElement | null = null;

  constructor(private modalService: ModalService) {
    this.documentBody = document.querySelector('body');
  }

  ngOnInit(): void {
    this.loadModalContent();
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.modalDataSubscription$?.unsubscribe();
    this.closeModalSubscription$?.unsubscribe();
  }

  closeModal() {
    this.closeModalSubscription$ = this.modalService.toggleModal.subscribe((isShowing) => {
      if (!isShowing) this.showModal = false;
    });
  }

  loadModalContent() {
    this.modalDataSubscription$ = this.modalService.getModalData().subscribe(({
      title,
      component,
      data,
      enableClose,
      maxWidth,
      isExpanded
    }) => {

      this.hangleOverflow();
      this.title = title;
      // this.closeOnBackdropClick = enableClose;
      this.isExpanded = isExpanded;

      if (maxWidth) this.maxWidth = maxWidth;

      const viewContainerRef = this.modalContent.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<any>(component);
      this.showModal = true;
      componentRef.instance.data = data;
    })
  }

  hangleOverflow() {
    this.documentBody?.classList.add('overflow-clip');
  }

  handleClose() {
    this.modalService.toggleModal.emit(false);
  }

}
