import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your main landing page after login.</p>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #007bff;
    }
    p {
      font-size: 1.2rem;
    }
  `],
  imports: [CommonModule],
  //templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
