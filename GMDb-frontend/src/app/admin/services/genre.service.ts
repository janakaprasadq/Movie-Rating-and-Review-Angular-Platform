import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private apiUrl = 'http://localhost:3000/api/genres'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addGenre(genreData: { genre: string }): Observable<any> {
    return this.http.post(this.apiUrl, genreData);
  }

  getAllGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
