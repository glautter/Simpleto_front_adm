import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Register GOV.BR web components
// @ts-ignore: loader is a runtime-only module without types
import('@govbr-ds/webcomponents/dist/esm/loader.js')
  .then(() => {
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error('Failed to load govbr webcomponents:', err);
    // still try to bootstrap the Angular app
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  });
