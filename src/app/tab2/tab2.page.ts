import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Result } from '../shared/interfaces/moviedb.interfaces';
import { MovieDetailComponent } from '../components/movie-detail/movie-detail.component';
import { StorageService } from '../services/storage.service';

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
  resultsInStorage: Result[] | null = null;
  ngOnInit(): void {
    this.getElementsStorage();
  }

  currentPage: number = 1;
  handleInput(event: CustomEvent) {
    if (event.detail.value.length > 0) {
      this.isLoadingData = true;
      const currentText = event.detail.value as string;
      this.movieService.searchMovie(currentText, this.currentPage).subscribe({
        next: (response) => {
          this.resultsMovie = structuredClone(response.results).slice(0, 5);
          this.storage.setMovies('searched', this.resultsMovie);
          this.getElementsStorage();
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
  }

  cancelInput(event: any) {
    this.resultsMovie = null;
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
    /*    this.searchBar.nativeElement.value = ""; */
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

  getElementsStorage() {
    console.log('ejecutando')
    this.storage.getMovie('searched').subscribe(response => {
      this.resultsInStorage = response;
    });
  }

  constructor(
    private movieService: MoviesService,
    private loadingCtr: LoadingController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController,
    private storage: StorageService
  ) { }

}
