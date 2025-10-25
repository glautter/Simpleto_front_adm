import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../layout/header/header';
import { SidenavComponent } from '../../layout/sidenav/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isSidenavOpen = true;
  isMobile = false;

  constructor(private observer: BreakpointObserver) {}

}