import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SwiperDirective } from 'src/app/directives/swiper.directive';
import { ListingImage } from 'src/app/types/listing';
import { Navigation, Pagination, A11y, Mousewheel, SwiperOptions, Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  imports: [CommonModule, SwiperDirective],
  standalone: true
})
export class SwiperComponent {

  @ViewChild('swiperRef', { static: false }) swiperRef?: ElementRef<HTMLElement>;

  @Input() innerActions: boolean = true;
  @Input() customClasses: string = "";
  @Input() slides?: ListingImage[];
  @Input() slidesPerView?: number;
  @Input() showPagination: boolean = true;
  @Input() centeredSlides: boolean = false;
  @Input() expandedControls?: boolean;
  @Input() initialSlide: number = 0;
  @Input() showDetails: boolean = true;

  config: SwiperOptions = {}

  swiper: Swiper | null = null;

  constructor(private detector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.config = {
      initialSlide: this.initialSlide,
      modules: [Navigation, Pagination, A11y, Mousewheel],
      spaceBetween: 20,
      navigation: false,
      centeredSlides: this.centeredSlides,
      pagination: this.showPagination
        ? {
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
          ...(this.expandedControls && {
            renderBullet: (index, className) => {
              return `
              <span class=${className}>
                <img class="pagination-image" style="--url:url(${this.slides![index].url})">
                </img>
              </span>
              `
            }
          })
        }
        : false,
      slidesPerView: this.slidesPerView || "auto",
      watchOverflow: true,
      injectStyles: [`
      .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: 30px;
      }
      .swiper-pagination-bullet {
        background: white;
      }
      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next,
      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
        opacity: 0.8;
      }
      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next,
      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
        opacity: 0.6;
      }
      .swiper-pagination-bullet-active > img {
          content: url('../../../assets/images/slider-pagination-active.png');
      }
      ${this.expandedControls && ".swiper-pagination-bullet { width: 75px !important; height: 75px !important; opacity: 1 !important; }"} 
      ${this.expandedControls && ".swiper-pagination-bullet-active-next { transform: scale(1) !important; }"} 
      ${this.expandedControls && ".swiper-pagination-bullet-active-next-next { transform: scale(1) !important; }"} 
      ${this.expandedControls && ".swiper-pagination-bullet-active-prev { transform: scale(1) !important; }"} 
      ${this.expandedControls && ".swiper-pagination-bullet-active-prev-prev { transform: scale(1) !important; }"} 
      ${this.expandedControls && ".swiper-pagination-bullet-active { opacity: .2 !important }"} 
      .pagination-image {
          width: 100%;
          height: 100%;
          content: var(--url) !important;
          object-fit: cover;
      }
      `]
    }
  }

  ngAfterViewInit(): void {
    this.swiper = (this.swiperRef?.nativeElement as any).swiper;
    this.detector.detectChanges();
        
  }

  handleNextSlide(e: MouseEvent, swipper: HTMLElement) {
    e.stopPropagation();
    const swiper = swipper as any;
    swiper.swiper.slideNext()
  }

  handlePrevSlide(e: MouseEvent, swipper: HTMLElement) {
    e.stopPropagation();
    const swiper = swipper as any;
    swiper.swiper.slidePrev()
  }

}
