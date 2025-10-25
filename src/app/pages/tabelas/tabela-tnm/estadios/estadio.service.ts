import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadio } from '../../../../shared/models/tabelas/estadio.model';

@Injectable({ providedIn: 'root' })
export class EstadioService {
  private apiUrl = 'https://localhost:7093/api/Estadio/All';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Estadio> {
    return this.http.get<Estadio>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<Estadio[]> {
    return this.http.get<Estadio[]>(this.apiUrl);
  }

  create(estadio: Estadio): Observable<Estadio> {
    return this.http.post<Estadio>(this.apiUrl, estadio);
  }

  update(estadio: Estadio): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${estadio.id}`, estadio);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
