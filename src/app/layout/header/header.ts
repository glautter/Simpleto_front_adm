import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { SidenavComponent } from "../sidenav/sidenav";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavContainer, MatSidenav, SidenavComponent, MatSidenavContent, RouterOutlet],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() isMobile = false;
  @Input() isSidenavOpen = false;

  onToggleSidenav() {
    this.menuToggle.emit();
  }
}
