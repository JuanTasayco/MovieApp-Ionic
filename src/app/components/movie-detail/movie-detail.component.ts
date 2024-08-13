import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { ActorsMovie, MovieDetail } from 'src/app/shared/interfaces/moviedb.interfaces';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  @Input() movieId: string = "";

  movie: MovieDetail | undefined = undefined;
  actorsMovie: ActorsMovie | undefined = undefined;
  readMoreIsOpen: boolean = true;
  statusTextReadMore: string = 'Leer más ...'
  descriptionMovie: string = "";
  ngOnInit() {
    this.getMovie();
    this.getActorsMovie();
  }

  getMovie() {
    this.movieService.getMovieDetailByID(this.movieId).subscribe(response => {
      this.movie = response;
      console.log(this.movie)
      this.openMoreText();
    })
  }

  openMoreText(): void {
    this.readMoreIsOpen = !this.readMoreIsOpen;
    if (this.movie?.overview) {
      this.statusTextReadMore = (this.readMoreIsOpen) ? ' Leer menos.' : '. Leer más ...'
    } else {
      this.statusTextReadMore = 'Sin descripción'
    }

    this.descriptionMovie = (this.readMoreIsOpen) ? <string>this.movie?.overview : <string>this.movie?.overview.slice(0, 70);
  }

  getActorsMovie() {
    this.movieService.getActorsByMovieID(this.movieId).subscribe(response => {
      this.actorsMovie = response;
      console.log(this.actorsMovie)
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }


  searchMovie(query: any) {

  }

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) { }


}
