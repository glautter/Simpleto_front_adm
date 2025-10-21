import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/core/component/component';
import { routes } from './app/app.routes';
import { tenantInterceptor } from './app/core/tenant.interceptor';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tenantInterceptor]))
  ]
}).catch(err => console.error(err));
