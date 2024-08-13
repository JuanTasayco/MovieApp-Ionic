import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorsMovie, DBResponse, MovieDetail } from '../shared/interfaces/moviedb.interfaces';

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

  getTopRatedMovies(page: number): Observable<DBResponse> {
    return this.httpClient.get<DBResponse>(`${this.urlMovieAPI}movie/top_rated`, {
      params: {
        page
      }
    })
  }

  getMovieDetailByID(id: string): Observable<MovieDetail> {
    return this.httpClient.get<MovieDetail>(`${this.urlMovieAPI}movie/${id}`, {
      params: {
        language: 'es-PE'
      }
    })
  }

  getActorsByMovieID(id: string): Observable<ActorsMovie> {
    return this.httpClient.get<ActorsMovie>(`${this.urlMovieAPI}movie/${id}/credits`, {
      params: {
        language: 'es-PE'
      }
    })
  }

  searchMovie(query: string, page: number = 1): Observable<DBResponse> {
    return this.httpClient.get<DBResponse>(`${this.urlMovieAPI}search/movie`, {
      params: {
        query,
        page,
        language: 'es-PE'
      }
    })
  }

}
