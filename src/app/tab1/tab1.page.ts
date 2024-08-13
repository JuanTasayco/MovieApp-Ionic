import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Result } from '../shared/interfaces/moviedb.interfaces';
import Swiper from 'swiper';
import { SlideshowDobleComponent } from '../components/slideshow-doble/slideshow-doble.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  movies: Result[] = [];
  upcomingMovies: Result[] = [];

  topRatedMovies: Result[] = [];
  pageCurrentTopRatedMovies: number = 1;

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

    this.getTopRatedMovie();

  }

  optionsSlide = {
    loop: true,
    slidesPerView: 1.3
  }


  changetopRated(action: string) {
    this.pageCurrentTopRatedMovies = action == 'more' ? this.pageCurrentTopRatedMovies + 1 : this.pageCurrentTopRatedMovies - 1;
    if (this.pageCurrentTopRatedMovies < 1 || this.pageCurrentTopRatedMovies > 6) this.pageCurrentTopRatedMovies = 1;

    this.getTopRatedMovie();
  }


  getTopRatedMovie() {
    this.moviesService.getTopRatedMovies(this.pageCurrentTopRatedMovies).subscribe({
      next: (response) => {
        this.topRatedMovies = response.results;
      }
    })
  }


  @ViewChild('containerDouble', { read: ViewContainerRef }) containerDouble!: ViewContainerRef;
  addComponentDouble() {
    const component = this.containerDouble.createComponent(SlideshowDobleComponent)
    component.instance.movies = this.movies;
    component.changeDetectorRef.detectChanges();
  }


  constructor(private moviesService: MoviesService) { }

}
