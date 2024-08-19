import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Result } from '../shared/interfaces/moviedb.interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  favoritesMovies: Result[] = [];
  generos: any = {};

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.getMovie('favorites').subscribe(response => {
      this.favoritesMovies = response;
      if (this.favoritesMovies) {
        this.favoritesMovies.forEach(movie => {
          for (let gen of movie.genres) {
            if (!this.generos[gen.name]) {
              this.generos[gen.name] = []
            } else {
              this.generos[gen.name].push(movie)
            }

          }
        })
      }
      console.log(this.generos)
    });
  }

}
