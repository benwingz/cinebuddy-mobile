import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserService } from '../../service/user.service';
import { MovieService } from '../../service/movie.service';

import { MovieListCmp } from '../../component/movielist/movielist.component';

@Component({
  selector: 'movie-showing',
  templateUrl: 'movieshowing.html'
})

export class MovieShowing {
  private username: string;
  private profile_pic: string;
  public movies: any;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private movieService: MovieService
  )
  {
    this.username = this.userService.currentUser.fb_full_name;
    this.profile_pic= this.userService.currentUser.fb_profile_picture;

    this.movieService.getMoviesList().subscribe(
      (movies) => {
        this.movieService.movies = movies;
        this.movies = movies;
        console.log(this.movieService.movies);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
