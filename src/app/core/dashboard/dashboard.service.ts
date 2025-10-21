
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getKPIs() {
    return of({
      condominios: 12,
      moradores: 342,
      ocorrenciasAbertas: 8,
      comunicados: 22,
      manutencoes: 3,
      mensagens: 5
    });
  }

  getOcorrenciasPorTipo() {
    return of([
      { name: 'Barulho', value: 8 },
      { name: 'Iluminação', value: 3 },
      { name: 'Água', value: 2 }
    ]);
  }

  getOcupacaoPorTorre() {
    return of([
      { torre: 'A', ocupacao: 86 },
      { torre: 'B', ocupacao: 92 },
      { torre: 'C', ocupacao: 75 }
    ]);
  }
}
