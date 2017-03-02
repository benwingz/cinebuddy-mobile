import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movie-cmp',
  template: `
  <img [src]="movie.poster_path"/>
  <p>{{movie.overview}}</p>`,

})
export class MovieCmp {

  @Input() movie: any;
  @Output() selectedMovie: EventEmitter<any> = new EventEmitter<any>();

  constructor()
  {

  }

  selectMovie() {
    this.selectedMovie.emit(this.movie);
  }
}
