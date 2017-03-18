import { Component, Input, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Slides } from 'ionic-angular';

import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'movie-list-cmp',
  template: `
  <div class="controls">
    <ion-icon name="arrow-dropleft-circle" (click)="goBack()"></ion-icon>
    <ion-icon name="arrow-dropright-circle" (click)="goForward()"></ion-icon>
  </div>
  <ion-slides>
    <ion-slide *ngFor="let movie of movies">
      <movie-cmp  [movie]="movie" (selectedMovie)="selectMovie($event)"></movie-cmp>
    </ion-slide>
  </ion-slides>`
})
export class MovieListCmp {

  @Output() movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input('movieList') movies:any;
  @ViewChild(Slides) slides:Slides;

  constructor(private movieService: MovieService){}

  goBack(): void {
    this.slides.slidePrev();
  }

  goForward(): void {
    this.slides.slideNext();
  }

  selectMovie(movie: any): void {
    this.movieService.getMovieDetail(movie.id)
      .subscribe( (movieDetailed) => {
        this.movieSelected.emit(movieDetailed);
      });
  }
}
