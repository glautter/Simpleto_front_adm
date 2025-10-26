import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-pagina-web',
  standalone: true,
  templateUrl: './pagina-web.html',
  styleUrls: ['./pagina-web.scss'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HeaderComponent
  ]
})
export class PaginaWebComponent implements AfterViewInit {
  @Output() menuToggle = new EventEmitter<void>();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isSidenavOpen = true;
  isMobile = false;

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit(): void {
    // Garantir que o sidenav exista antes de acessar
    this.observer.observe(['(max-width: 800px)']).subscribe(result => {
      this.isMobile = result.matches;

      if (!this.sidenav) return; // ✅ Verificação

      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  onToggleSidenav() {
    this.menuToggle.emit();
  }
}
