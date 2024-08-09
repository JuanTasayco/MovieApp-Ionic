import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Result } from '../shared/interfaces/moviedb.interfaces';
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  movies: Result[] = [];
  upcomingMovies: Result[] = [];
  topRatedMovies: Result[] = [];
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
      }
    })

    this.moviesService.getUpcomingMovies().subscribe({
      next: (response) => {
        this.upcomingMovies = response.results;
      }
    })

    this.moviesService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.topRatedMovies = response.results;
        console.log(response)
      }
    })
  }

  optionsSlide = {
    loop: true,
    slidesPerView: 1.3
  }

}
