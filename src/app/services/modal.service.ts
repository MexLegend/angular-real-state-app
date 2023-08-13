import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

export type LoginAction = "Login" | "Register";
export type ToastType = "Success" | "Info" | "Warning" | "Error";

interface Modal {
  title: string;
  data: any;
  enableClose?: boolean;
  component: ComponentType<unknown>;
  maxWidth?: string;
  isExpanded?: boolean;
}

interface Dropdown {
  componentRef: TemplateRef<any>;
  maxWidth?: string;
}

interface Toast {
  type: ToastType,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor() { }

  private modalData = new Subject<Modal>();
  public toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  private dropdownData = new Subject<Dropdown>();
  public toggleDropdown: EventEmitter<boolean> = new EventEmitter<boolean>();

  private toast = new Subject<Toast>();

  // Show Modal emitting true and then await 10 milliseconds
  // to be sure that the modal component is rendered before render its content
  setModalData(props: Modal) {
    this.toggleModal.emit(true);
    setTimeout(() => this.modalData.next(props), 10);
  }

  getModalData(): Observable<Modal> {
    return this.modalData.asObservable();
  }

  // Show Dropdown emitting true and then await 10 milliseconds
  // to be sure that the dropdown component is rendered before render its content
  setDropdownData(props: Dropdown) {
    this.toggleDropdown.emit(true);
    setTimeout(() => this.dropdownData.next(props), 10);
  }

  getDropdownData(): Observable<Dropdown> {
    return this.dropdownData.asObservable();
  }

  setToast(type: ToastType, message: string) {
    this.toast.next({ type, message });
  }

  getToast() {
    return this.toast.asObservable();
  }

}
