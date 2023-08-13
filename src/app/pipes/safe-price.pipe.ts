import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePrice',
  standalone: true
})
export class SafePricePipe implements PipeTransform {

  transform(price: string): string {
    return Number(price).toLocaleString();
  }

}
