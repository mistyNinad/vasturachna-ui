// login.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [
    AuthService          // ✅ Provide service locally
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router ) {}

  onLogin() {
    console.log('in side login');
    this.authService.login(this.username, this.password).subscribe({    next: () => {
      console.log('✅ Login successful');
      //this.router.navigate(['/project']);
      this.router.navigate(['/dashboard']); // instead of /project
      //this.router.navigate(['settings'])

    },
    error: err => console.error('❌ Login failed', err)
  });
}
}
