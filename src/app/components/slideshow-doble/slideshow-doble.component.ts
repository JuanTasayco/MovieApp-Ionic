import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Result } from 'src/app/shared/interfaces/moviedb.interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-doble',
  templateUrl: './slideshow-doble.component.html',
  styleUrls: ['./slideshow-doble.component.scss'],
})
export class SlideshowDobleComponent implements OnInit {
  @Input() movies: Result[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('');
  }

  async openModalMenu(movie: Result) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId: movie?.id
      }
    })
    modal.present();
  }

}
