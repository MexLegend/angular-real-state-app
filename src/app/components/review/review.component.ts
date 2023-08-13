import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

export interface Review {
  review: string;
  createdAt: string;
  user: SafeUser
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  @Input() review?: Review;

}
