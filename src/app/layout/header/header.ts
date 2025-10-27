import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() isMobile = false;
  @Input() isSidenavOpen = false;

  private router = inject(Router);
  
  onToggleSidenav() {
    this.menuToggle.emit();
  }

  goHome() {
    this.router.navigate(['/administracao-home/dashboard-condominio']);
  }
}
