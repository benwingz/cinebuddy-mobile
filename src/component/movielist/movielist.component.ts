import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-list-cmp',
  template: `
  <ion-slides>
    <ion-slide *ngFor="let movie of movies">
      <movie-cmp  [movie]="movie"></movie-cmp>
    </ion-slide>
  </ion-slides>`
})
export class MovieListCmp {

  @Input('movieList') movies:any;

  constructor()
  {
    console.log('Movies in movielist', this.movies);
  }



}
