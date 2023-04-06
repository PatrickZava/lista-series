import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyMemoryService {
  url = 'https://api.mymemory.translated.net/get?q=';

  constructor(private http: HttpClient) {}

  translate(text: Object) {
    return this.http.get(this.url + text);
  }
}
