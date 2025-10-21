import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  kpis: any = {};
  ocorrencias: any[] = [];
  ocupacao: any[] = [];

  constructor(private svc: DashboardService) {}

  ngOnInit() {
    this.svc.getKPIs().subscribe(x => this.kpis = x);
    this.svc.getOcorrenciasPorTipo().subscribe(x => this.ocorrencias = x);
    this.svc.getOcupacaoPorTorre().subscribe(x => this.ocupacao = x);
  }
}
