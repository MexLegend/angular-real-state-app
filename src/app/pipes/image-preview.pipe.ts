import { Pipe, PipeTransform } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Pipe({
  name: 'imagePreview',
  standalone: true
})
export class ImagePreviewPipe implements PipeTransform {

  transform(file?: File): Observable<string> {
    if (!file) return of("");

    const imageUrl = URL.createObjectURL(file);
    return of(imageUrl).pipe(delay(100));
  }

}
