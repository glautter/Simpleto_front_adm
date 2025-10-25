import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { HomeComponent } from "./pages/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('condo-admin-simpleto');

}
