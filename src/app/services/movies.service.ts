import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DBResponse } from '../shared/interfaces/moviedb.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  urlMovieAPI: string = environment.urlMovie;

  getMovies(page: number = 1): Observable<DBResponse> {
    return this.httpClient.get<DBResponse>(`${this.urlMovieAPI}discover/movie`, {
      params: {
        page,
        lenguage: 'en'
      }
    })
  }

  getUpcomingMovies(): Observable<DBResponse> {
    return this.httpClient.get<DBResponse>(`${this.urlMovieAPI}movie/upcoming`);
  }

  getTopRatedMovies(): Observable<DBResponse> {
    return this.httpClient.get<DBResponse>(`${this.urlMovieAPI}movie/top_rated`)
  }

}
