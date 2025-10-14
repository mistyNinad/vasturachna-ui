import 'zone.js';  // ✅ Required for Angular default change detection
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login';
import { Project } from './app/project/project';
import { routes } from './app/app.routes';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())   // ✅ make HttpClient available
  ]
});