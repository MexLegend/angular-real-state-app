import { NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';
import { ModalService } from 'src/app/services/modal.service';
import { ListingImage } from 'src/app/types/listing';

export interface HeroDialogData {
  heroImages: ListingImage[];
  initialSwiperSlide: number;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [SwiperComponent, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class HeroComponent {

  @Input() data?: HeroDialogData;

  constructor(private modalService: ModalService) { }

  handleClose = () => {
    this.modalService.toggleModal.emit(false);
  }

}
