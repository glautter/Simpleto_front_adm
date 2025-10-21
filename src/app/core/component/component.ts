import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav style="background:#1976d2;color:#fff;padding:10px;">
      <a routerLink="/dashboard" style="color:#fff;margin-right:20px;">Dashboard</a>
      <a routerLink="/condominios" style="color:#fff;">Condomínios</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
