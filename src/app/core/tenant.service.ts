import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private _ownerId$ = new BehaviorSubject<string | null>(localStorage.getItem('ownerId'));
  ownerId$ = this._ownerId$.asObservable();

  setOwner(id: string) {
    this._ownerId$.next(id);
    localStorage.setItem('ownerId', id);
  }

  getOwner(): string | null {
    return this._ownerId$.getValue();
  }
}
