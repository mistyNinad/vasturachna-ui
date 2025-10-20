import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink,RouterLinkActive,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule
  
  ],
  template: `
  <div class="layout">
    <!-- Sidebar (hidden on login page) -->
    <nav class="sidebar" *ngIf="!isLoginPage()">
      <h2>MyApp</h2>
      <ul>
      <li><a routerLink="/dashboard" routerLinkActive="active">🏠 Dashboard</a></li>
      <li><a routerLink="/project" routerLinkActive="active">📂 Create Project</a></li>
      <li>
       <a routerLink="/projects" routerLinkActive="active">📂 Projects</a>
      </li>
      <li>
        <a routerLink="/settings" routerLinkActive="active">⚙️ Settings</a>
        <ul>
          <li><a routerLink="/settings/create-user" routerLinkActive="active">➕ Create User</a></li>
        </ul>
        <ul>
          <li><a routerLink="/settings/stages" routerLinkActive="active">➕ Stage Payments</a></li>
        </ul>
      </li>
      <li>
      <a routerLink="/users" routerLinkActive="active">Users</a>
    </li>
    </ul>
    </nav>

    <!-- Main Content -->
    <main class="content" [class.full-width]="isLoginPage()">
      <router-outlet></router-outlet>
    </main>
  </div>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-app');

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/login');
  }
}
