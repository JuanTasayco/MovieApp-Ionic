import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Result } from '../shared/interfaces/moviedb.interfaces';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

export type nameStorage = 'searched' | 'favorites'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  moviesSearched: Result[] = [];
  favorites: Result[] = [];

  storageSubjet = new BehaviorSubject<any>({});



  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    this._storage = await this.storage.create();
    await this.loadData();
  }

  private async loadData() {
    if (this._storage) {
      this.moviesSearched = await this._storage?.get('searched') || [];
      this.favorites = await this._storage?.get('favorites') || [];
      this.storageSubjet.next({
        searched: this.moviesSearched,
        favorites: this.favorites
      })
    }
  }

  async setMovies(key: nameStorage, values: Result[]) {
    await this._storage?.set(key, values);
    await this.loadData();
  }

  getMovie(key: nameStorage): Observable<Result[]> {
    return this.storageSubjet.asObservable().pipe(map((result) => result[key]));
  }

  async validateFavoriteMovie(movie: Result) {
    if (!!this.favorites.find((result) => result.id == movie.id)) {
      const newArray = this.favorites.filter((localMovie) => localMovie.id !== movie.id);
      this.setMovies('favorites', newArray);
    } else {
      this.setMovies('favorites', [...this.favorites, movie]);
    }
  }

}
