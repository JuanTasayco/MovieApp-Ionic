import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  ngOnInit(): void {
    console.log('')
  }

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
  /* https://www.mercadolibre.com.pe/juego-de-olla-roca-volcanica-antiadherente-9pcs-100-ecolog-color-negro/p/MPE36193608#reco_item_pos=0&reco_backend=best-seller&reco_backend_type=low_level&reco_client=highlights-rankings&reco_id=1390cc0b-4310-4648-968f-753d46feaebe */
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

  constructor(
    private movieService: MoviesService,
    private loadingCtr: LoadingController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController) { }

}
