import { Component, ChangeDetectorRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header";
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { SidenavComponent } from "../../layout/sidenav/sidenav";
import { RouterOutlet } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-administracao-home',
  standalone: true,
  imports: [HeaderComponent, MatSidenavContainer, MatSidenav, SidenavComponent, MatSidenavContent, RouterOutlet],
  templateUrl: './administracao-home.html',
  styleUrls: ['./administracao-home.scss']
})
export class AdministracaoHomeComponent implements OnInit, AfterViewInit {
  sidenavMode: 'side' | 'over' = 'over';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isSidenavOpen = true;
  isMobile = false;
  private isBrowser: boolean;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // detecta se o código está rodando no navegador
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser && window.innerWidth > 768) {
      this.sidenavMode = 'side';
      this.cdr.detectChanges(); // força o Angular a aceitar a mudança
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // impede execução no SSR

    if (window.innerWidth > 768) {
      this.sidenavMode = 'side';
    }

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
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
  }

  toggleSidenav() {
  if (this.sidenav.mode === 'over') {
    this.isSidenavOpen ? this.sidenav.close() : this.sidenav.open();
    this.isSidenavOpen = !this.isSidenavOpen;
    return;
  }

  // Desktop: recolhe o menu lateral
  if (this.isSidenavOpen) {
    this.sidenav.close();
  } else {
    this.sidenav.open();
  }
  this.isSidenavOpen = !this.isSidenavOpen;
}
}
