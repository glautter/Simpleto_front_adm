
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

export interface Condominio { id: string; nome: string; cnpj?: string; ativo: boolean; }

@Injectable({ providedIn: 'root' })
export class CondominiosService {
  private _list$ = new BehaviorSubject<Condominio[]>([
    { id: uuid(), nome: 'Residencial Oceano', cnpj: '00.000.000/0001-00', ativo: true },
    { id: uuid(), nome: 'Condomínio Sol', cnpj: '11.111.111/0001-11', ativo: true }
  ]);

  list(): Observable<Condominio[]> { return this._list$.asObservable(); }
  get(id: string) { return of(this._list$.getValue().find(x => x.id === id)); }
  add(payload: Partial<Condominio>) {
    const item: Condominio = { id: uuid(), nome: payload.nome || 'Novo', ativo: true } as any;
    this._list$.next([...this._list$.getValue(), item]);
    return of(item);
  }
  update(id: string, payload: Partial<Condominio>) {
    const arr = this._list$.getValue().map(x => x.id === id ? { ...x, ...payload } : x);
    this._list$.next(arr);
    return of(true);
  }
  remove(id: string) {
    const arr = this._list$.getValue().filter(x => x.id !== id);
    this._list$.next(arr);
    return of(true);
  }
}
