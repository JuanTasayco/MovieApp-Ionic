import { Component, OnInit } from '@angular/core';
import { IonSearchbar, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Result } from '../shared/interfaces/moviedb.interfaces';
import { MovieDetailComponent } from '../components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isLoadingData: boolean = true;
  resultsMovie: Result[] | null = null;
  isMovieExist: boolean = false;
  noExistResults: boolean = false;

  ngOnInit(): void { }



  currentPage: number = 1;
  handleInput(event: CustomEvent) {
    this.isLoadingData = true;
    const currentText = event.detail.value as string;
    this.movieService.searchMovie(currentText, this.currentPage).subscribe({
      next: (response) => {
        this.resultsMovie = structuredClone(response.results).slice(0, 5);
        if (this.resultsMovie.length === 0) {
          this.noExistResults = true;
          this.generateToast();
        }
      },
      complete: () => {
        this.isLoadingData = false;
      }
    })
  }

  async generateLoading() {
    const loading = await this.loadingCtr.create(
      {
        message: 'Cargando'
      }
    )
    loading.present();
  }

  async generateToast() {
    const toast = await this.toasCtrl.create({
      message: 'No se encontraron resultados',
      duration: 2000,
      position: 'bottom'
    })

    toast.present();
  }

  async selectMovie(movieId: number) {
    const modal = await this.modalCtrl.create(
      {
        component: MovieDetailComponent,
        componentProps: {
          movieId
        }
      }
    );
    modal.present();
  }

  constructor(
    private movieService: MoviesService,
    private loadingCtr: LoadingController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController) { }

}
