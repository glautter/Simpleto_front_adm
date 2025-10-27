import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { HeaderComponent } from "../../layout/header/header";
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { SidenavComponent } from "../../layout/sidenav/sidenav";
import { RouterOutlet } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-administracao-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavContainer,
    MatSidenav,
    SidenavComponent,
    MatSidenavContent,
    RouterOutlet
  ],
  templateUrl: './administracao-home.html',
  styleUrls: ['./administracao-home.scss']
})
export class AdministracaoHomeComponent implements OnInit, AfterViewInit {
  sidenavMode: 'side' | 'over' = 'side';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  /** Estado visual do sidenav */
  isSidenavOpen = true;   // ✅ abre expandido
  isMobile = false;
  hover = false;
  private isBrowser: boolean;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // ✅ abre expandido se for desktop
    if (this.isBrowser && window.innerWidth > 768) {
      this.sidenavMode = 'side';
      this.isSidenavOpen = false; // false = expandido
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        // 📱 Mobile
        this.isMobile = true;
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.isSidenavOpen = true; // true = recolhido (só ícones)
      } else {
        // 💻 Desktop
        this.isMobile = false;
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.isSidenavOpen = false; // false = expandido
      }
    });
  }

  /** Alterna estado pelo botão do header */
  toggleSidenav() {
    if (this.sidenav.mode === 'over') {
      this.isSidenavOpen ? this.sidenav.close() : this.sidenav.open();
      this.isSidenavOpen = !this.isSidenavOpen;
      return;
    }

    // Desktop: alterna estado expandido/recolhido
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
