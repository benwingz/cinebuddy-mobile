import { Component, Input, ViewChild, HostListener, EventEmitter, Output, trigger, state, animate, transition, style } from '@angular/core';
import { Slides } from 'ionic-angular';

import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'movie-list-cmp',
  templateUrl: `movielist.component.html`,
  animations: [
    trigger('controlsShow', [
      state('shown', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('shown => hidden', animate('.5s ease-out')),
      transition('hidden => shown', animate('.5s ease-in'))
    ])
  ]
})
export class MovieListCmp {

  @Output() movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input('movieList') movies:any;
  @Input('controlsState') showControls: boolean;
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
