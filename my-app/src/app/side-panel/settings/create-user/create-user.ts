import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [   FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule, CommonModule, HttpClientModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css'
})
export class CreateUserComponent implements OnInit {

  userId: number = 0;
  isEditMode: boolean = false;
 // User form model
 user = {
  name:'',
  username: '',
  password: '',
  email: '',
  whatsappNumber: '',
  mobileNumber: '',
  adharNumber: '',
  panNumber:'',
  address: '',
  notes: ''
};

constructor(private userService: UserService,private route: ActivatedRoute,private http: HttpClient, private router: Router) {}
ngOnInit(): void {
  this.userId = Number(this.route.snapshot.paramMap.get('id'));
  this.isEditMode = this.userId !== 0;

  if (this.isEditMode) {
    this.userService.getUserById(this.userId).subscribe((data: any) => {
      this.user = data; // auto-fill form with existing details
    });
  }
}
onSubmit() {
  this.userId = Number(this.route.snapshot.paramMap.get('id'));
  this.isEditMode = this.userId !== 0;
  
  console.log('Creating user:', this.user);

  if (this.isEditMode) {
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      alert('User updated successfully!');
      this.router.navigate(['/users']);
    });
  } else {
    this.userService.createUser(this.user).subscribe(() => {
      alert('User created successfully!');
      this.router.navigate(['/users']);
    });
  }


  // POST request to backend
  // this.http.post('http://localhost:8080/user', this.user)
  //   .subscribe({
  //     next: (res: any) => {
  //       console.log('User created successfully', res);
  //       alert('User created successfully!');
  //       // Optionally navigate to settings or dashboard
  //       this.router.navigate(['/settings']);
  //     },
  //     error: (err: any) => {
  //       console.error('Error creating user', err);
  //       alert('Failed to create user.');
  //     }
  //   });
}


}
