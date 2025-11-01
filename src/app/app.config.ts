import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🔹 Ativa detecção de zona otimizada
    provideZoneChangeDetection({ eventCoalescing: true }),
    // 🔹 Define rotas
    provideRouter(routes),
    // 🔹 Configura HttpClient com interceptors declarados
    provideHttpClient(withInterceptorsFromDi()),
    // 🔹 Ativa animações assíncronas (forma correta no Angular 20)
    provideAnimationsAsync(),
    // 🔹 Hidratação (para SSR e event replay)
    provideClientHydration(withEventReplay())
  ]
};
