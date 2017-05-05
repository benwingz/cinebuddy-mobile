import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movie-cmp',
  template: `
  <div class="poster" [ngStyle]="{'background-image': 'url(' + movie.poster_path + ')' }"></div>
  <p>{{movie.overview}}</p>
  <button ion-button (click)="selectMovie()">Trouver une séance</button>`

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
