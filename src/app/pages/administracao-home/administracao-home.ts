import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../layout/header/header';
import { SidenavComponent } from '../../layout/sidenav/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'administracao-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HeaderComponent,
    SidenavComponent,
    RouterOutlet
],
  templateUrl: './administracao-home.html',
  styleUrl: './administracao-home.scss'
})
export class AdministracaoHomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isSidenavOpen = true;
  isMobile = false;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    setTimeout(() => {
      if (res.matches) {
        this.isMobile = true;
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.isSidenavOpen = false;
      } else {
        this.isMobile = false;
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.isSidenavOpen = true;
      }
    });
  });
  }

  toggleSidenav() {
    // Toggle the drawer open/close. On mobile this opens the overlay to full width.
    if (this.sidenav.mode === 'over') {
      if (this.isSidenavOpen) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
      this.isSidenavOpen = !this.isSidenavOpen;
      return;
    }

    // Desktop: toggle show/hide the sidenav
    if (this.isSidenavOpen) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.isSidenavOpen = !this.isSidenavOpen;
    console.log('toggleSidenav: isSidenavOpen=', this.isSidenavOpen);
  }
}