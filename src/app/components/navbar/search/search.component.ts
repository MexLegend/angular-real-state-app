import { ChangeDetectorRef, Component, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, debounceTime, delay, distinctUntilChanged } from 'rxjs';
import { Feature, MapboxService } from 'src/app/services/mapbox.ts.service';
import { OutsideClickDirective } from 'src/app/directives/outside-click.directive';
import { CommonModule } from '@angular/common';
import { SearchMenuComponent } from '../search-menu/search-menu.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    CommonModule,
    OutsideClickDirective,
    SearchMenuComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class SearchComponent {

  @ViewChild(OutsideClickDirective) outsideClickDirective?: OutsideClickDirective;

  @Input() placeholder: string = "Search property by location";
  @Input() isExpanded: boolean = false;
  @Output() location?: Feature;

  searchInputSubscription$?: Subscription;
  formSubscription$?: Subscription;
  handleCloseMenuSub$?: Subscription;

  form: FormGroup;
  locations: Feature[] = [];
  preventMenuClose: boolean = false;
  isMenuVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mapboxService: MapboxService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = this.initForm();
    this.handleSetFormValue();
    this.handleFormChanges();
  }

  @HostListener('window:scroll', ['$event'])
  getScrollHeight() {
    if (window.scrollY > 0 && this.isMenuVisible && !this.isExpanded)
      this.isMenuVisible = false;
  }

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  showMenu(isVisible?: boolean) {
    if (!!this.form.value.searchParam) this.outsideClickDirective?.showMenu(isVisible);
  }

  preventCloseOnClick() {
    this.outsideClickDirective?.preventCloseOnClick();
  }

  ngOnDestroy(): void {
    this.formSubscription$?.unsubscribe();
    this.handleCloseMenuSub$?.unsubscribe();
    this.searchInputSubscription$?.unsubscribe();
  }

  handleFormChanges() {
    this.formSubscription$ =
      this.form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(value => {

        // Check that form "searchParam" is null
        if (!value.searchParam) {
          this.locations = [];
          this.isMenuVisible = false;
        } else {
          const getLocationsSubscription = this.mapboxService.searchPlaceByTerm(value.searchParam).subscribe(locations => {
            this.isMenuVisible = true;
            this.locations = locations;

            getLocationsSubscription.unsubscribe();
          });
        }
      });
  }

  initForm(): FormGroup {
    return this.fb.group({
      searchParam: [{ value: "", disabled: false }, Validators.required]
    });
  }

  handleSetFormValue() {
    this.searchInputSubscription$ = this.mapboxService.emitSetSearchInputValue.subscribe(({ placeName }) => {
      this.form.setValue({ searchParam: placeName }, { emitEvent: false });
      this.isMenuVisible = false;
    });
  }
}
