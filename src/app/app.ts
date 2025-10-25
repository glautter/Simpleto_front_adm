import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('condo-admin-simpleto');
  irParaHome(){
      window.location.href = '/home';
  }
}
