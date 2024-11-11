import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../Actor';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private apiUrl = 'http://localhost:3000/api/actors';

  constructor(private http: HttpClient) {}

  addActor(actor: Actor): Observable<Actor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Actor>(this.apiUrl, actor, { headers });
  }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }
}
