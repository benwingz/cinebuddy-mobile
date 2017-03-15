import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'movie-list-cmp',
  template: `
  <div class="controls">
    <ion-icon name="arrow-dropleft-circle" (click)="goBack()"></ion-icon>
    <ion-icon name="arrow-dropright-circle" (click)="goForward()"></ion-icon>
  </div>
  <ion-slides>
    <ion-slide *ngFor="let movie of movies">
      <movie-cmp  [movie]="movie"></movie-cmp>
    </ion-slide>
  </ion-slides>`
})
export class MovieListCmp {

  @Input('movieList') movies:any;
  @ViewChild(Slides) slides:Slides;

  constructor(){}

  @HostListener('window:scroll', [])
  onScroll() {
    console.log(window.pageYOffset);
  }

  goBack(): void {
    /*if (this.slides.getActiveIndex() != 0){

    }*/
    this.slides.slidePrev();
  }

  goForward(): void {
    this.slides.slideNext();
  }
}
