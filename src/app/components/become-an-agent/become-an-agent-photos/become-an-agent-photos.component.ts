import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddedFiles,
  CloudinaryService,
  UploadResponse,
} from 'src/app/services/cloudinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { DragAndDropZoneComponent } from '../../drag-and-drop-zone/drag-and-drop-zone.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';

@Component({
  selector: 'app-become-an-agent-photos',
  standalone: true,
  imports: [CommonModule, DragAndDropZoneComponent],
  templateUrl: './become-an-agent-photos.component.html',
  styleUrls: ['./become-an-agent-photos.component.css'],
})
export class BecomeAnAgentPhotosComponent {
  files: AddedFiles[] = [];

  getSelectedFilesSub$?: Subscription;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private becomeAnAgentService: BecomeAnAgentService,
    private cloudinaryService: CloudinaryService,
    private cookieService: CookieService
  ) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({
      formGroupRef: this.form,
      stepRoute: 'photos',
    });
    this.getSelectedFiles();
    this.handleSetSelectedFiles();
  }

  ngOnDestroy(): void {
    this.getSelectedFilesSub$?.unsubscribe();
  }

  getSelectedFiles() {
    this.getSelectedFilesSub$ =
      this.cloudinaryService.emitSelectedFiles.subscribe((files) => {
        this.form.setValue({
          images: files.map((file) => ({
            url: file.file?.url,
            public_id: file.file?.public_id,
          })),
        });
        this.cookieService.set('photos', JSON.stringify(this.form.value));
      });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      images: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  handleSetSelectedFiles() {
    setTimeout(() => {
      this.files =
        this.form.value.images?.map((image: UploadResponse) => ({
          progress: 100,
          state: 'DONE',
          file: image,
          isUploaded: true
        })) || [];
    }, 100);
  }
}
