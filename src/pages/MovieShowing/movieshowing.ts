import { Component, ViewChild } from '@angular/core';

import { NavController, Content } from 'ionic-angular';

import { UserService } from '../../service/user.service';
import { MovieService } from '../../service/movie.service';

import { MovieListCmp } from '../../component/movielist/movielist.component';

import { FindtheaterPage } from '../findtheater/findtheater';

@Component({
  selector: 'movie-showing',
  templateUrl: 'movieshowing.html'
})

export class MovieShowing {
  public movies: any;
  private controlsState: String = 'shown';

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private movieService: MovieService
  )
  {
    this.movieService.getMoviesList().subscribe(
      (movies) => {
        this.movies = movies;
        //console.log(this.movies);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onScroll($event): void {
    if($event.scrollTop >100) {
      this.controlsState = 'hidden';
    } else {
      this.controlsState = 'shown';
    }
  }

  findTheater(movie): any {
    this.navCtrl.push(FindtheaterPage, { movieId: movie.idShowtimeProvider });
  }
}
