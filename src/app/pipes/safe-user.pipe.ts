import { Pipe, PipeTransform } from '@angular/core';
import { SafeUser } from '../types';

@Pipe({
  name: 'safeUser',
  standalone: true
})
export class SafeUserPipe implements PipeTransform {

  transform(user: string | SafeUser): SafeUser {
    return user as SafeUser;
  }

}
