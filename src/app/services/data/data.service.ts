import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://api.tvmaze.com/shows';
  private searchUrl = 'https://api.tvmaze.com/search/shows?q=';
  private urlById = '  https://api.tvmaze.com/shows/';

  constructor(private http: HttpClient) {}

  getAllShows() {
    return this.http.get(this.url);
  }

  getShow(searchedTerm: string) {
    return this.http.get(this.searchUrl + searchedTerm);
  }

  getShowById(id: string) {
    return this.http.get(this.urlById + id);
  }
}
