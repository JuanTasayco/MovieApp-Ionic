import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Result } from 'src/app/shared/interfaces/moviedb.interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent {
  @Input({ required: true }) movies: Result[] = [];
  isCloseModal: boolean = false;
  constructor(private modalCtr: ModalController) { }
  /*   async ngOnInit() {
      const modal = await this.modalCtr.create({
        component: MovieDetailComponent,
        componentProps: {
          movieId: 533535
        }
      })
      modal.present();
    } */

  async openModalMovie(movie: Result | undefined) {
    const modal = await this.modalCtr.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId: movie?.id
      }
    })
    modal.present();
  }

}
