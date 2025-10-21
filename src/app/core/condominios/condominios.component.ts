import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondominiosService } from './condominios.service';

@Component({
  selector: 'app-condominios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condominios.component.html',
  styleUrls: ['./condominios.component.scss'],
  providers: [CondominiosService]
})
export class CondominiosComponent implements OnInit {
  items: any[] = [];

  constructor(private svc: CondominiosService) {}

  ngOnInit() {
    this.svc.list().subscribe(x => this.items = x);
  }

  add() {
    this.svc.add({ nome: 'Novo Condomínio' }).subscribe();
  }
}
