import { Component, Input, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Slides } from 'ionic-angular';

import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'movie-list-cmp',
  template: `
  <div class="controls" [style.opacity]="styleControls">
    <ion-icon
      name="arrow-dropleft-circle"
      class="left"
      [class.hidden]="hidden"
      (click)="goBack()">
    </ion-icon>
    <ion-icon
      name="arrow-dropright-circle"
      class="right"
      [class.hidden]="hidden"
      (click)="goForward()">
    </ion-icon>
  </div>
  <ion-slides #Slides>
    <ion-slide *ngFor="let movie of movies">
      <movie-cmp [movie]="movie" (selectedMovie)="selectMovie($event)"></movie-cmp>
    </ion-slide>
  </ion-slides>`
})
export class MovieListCmp {

  @Output() movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input('movieList') movies:any;
  @Input('hiddenControls') hidden: boolean;
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
