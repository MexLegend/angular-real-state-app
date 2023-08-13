import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HeroComponent } from 'src/app/modals/hero/hero.component';
import { ModalService } from 'src/app/services/modal.service';
import { ListingImage } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-hero',
  templateUrl: './listing-hero.component.html',
  styleUrls: ['./listing-hero.component.css']
})
export class ListingHeroComponent {

  @Input() listingId: string = "";
  @Input() images: ListingImage[] = [];

  isOpen: boolean = false;
  heroImagesList: ListingImage[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.heroImagesList = [...this.images].slice(2, 8);
    this.changeDetector.detectChanges();
  }

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  }

  handleHeroModal = (index: number = 0) => {
    this.toggleOpen();
    this.modalService.setModalData({
      component: HeroComponent,
      title: '',
      data: { heroImages: this.images, initialSwiperSlide: index },
      maxWidth: "max-w-full",
      enableClose: true,
      isExpanded: true
    });
  }
}
