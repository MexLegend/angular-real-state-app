import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  constructor() { }

  atLeastOneSelected(group: AbstractControl) {
    const isOneSelected = Object.keys(group.value).some(key => {
      return group.value[key].value;
    });

    return isOneSelected ?
      null :
      { atLeastOneRequired: 'At least one should be selected' };
  }
}
