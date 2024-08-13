import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Result } from '../shared/interfaces/moviedb.interfaces';

export type nameStorage = 'searched' | 'favorites'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  moviesSearched: Result[] = [];
  favorites: Result[] = [];

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async setMovies(key: nameStorage, values: Result[]) {
    await this._storage?.set(key, values);
  }

  async getMovie(key: nameStorage) {
    /*   switch (key) {
        case 'searched':
          this.moviesSearched = await this._storage?.get(key);
          return this.moviesSearched;
        case 'favorites':
          this.favorites = await this._storage?.get(key);
          return this.favorites;
        default:
          return []
      }
   
   */
    const storagesResults = {
      'searched': async () => {
        this.moviesSearched = await this._storage?.get(key);
      },
      'favorites': async () => {
        this.favorites = await this._storage?.get(key);
      }
    }
    console.log(storagesResults[key])
    /*     return storagesResults[key]; */

  }

}
