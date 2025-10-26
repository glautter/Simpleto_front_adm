import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header";
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { SidenavComponent } from "../../layout/sidenav/sidenav";
import { RouterOutlet } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-administracao-home',
  standalone: true,
  imports: [HeaderComponent, MatSidenavContainer, MatSidenav, SidenavComponent, MatSidenavContent, RouterOutlet],
  templateUrl: './administracao-home.html',
  styleUrls: ['./administracao-home.scss']
})
export class AdministracaoHomeComponent implements OnInit {
  sidenavMode: 'side' | 'over' = 'over';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isSidenavOpen = true;
  isMobile = false;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (window.innerWidth > 768) {
      this.sidenavMode = 'side';
      this.cdr.detectChanges(); // força o Angular a aceitar a mudança
    }
  }

  ngAfterViewInit() {
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
