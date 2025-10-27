import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-condominio',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-condominio.html',
  styleUrls: ['./dashboard-condominio.scss']
})
export class DashboardCondominioComponent {
  // Dados simulados do condomínio
  resumo = {
    blocos: 4,
    unidades: 120,
    moradores: 340,
    visitantesHoje: 15,
    ocorrenciasAbertas: 3
  };

  avisos = [
    { titulo: 'Manutenção Elétrica', data: '2025-10-26', descricao: 'Interrupção de energia das 14h às 16h.' },
    { titulo: 'Limpeza da Piscina', data: '2025-10-28', descricao: 'Piscina interditada para manutenção semanal.' },
    { titulo: 'Assembleia Geral', data: '2025-11-05', descricao: 'Convite para reunião às 19h no salão de festas.' }
  ];
}

