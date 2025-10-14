import { Component } from '@angular/core';
import { CreateUserComponent } from './create-user/create-user';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,   // ✅ required for standalone components
  imports: [CreateUserComponent,RouterOutlet,CommonModule],        // ✅ add CommonModule, FormsModule, etc. later if needed
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']   // ✅ correct property name
})
export class SettingsComponent { }
