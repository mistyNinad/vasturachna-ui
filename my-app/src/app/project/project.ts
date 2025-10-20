import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 required for *ngIf, *ngFor
import Swal from 'sweetalert2';
import { ProjectService } from '../services/project.service';
import { StageService } from '../services/stage.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule,CommonModule, MatSnackBarModule],
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class Project {
  @Input() projectId?: number;  // optional input for edit

  project: any = {
    id: null,
    title: '',
    overview: '',
    location: '',
    projectConstructionCost: '',
    estimatedCost: null,
    images: [],
    landDetails: {
      zone: 'agricultural',
      ubl: 'PMRDA',
      plotNo: '',
      landType: 'agricultural',
      areaType: 'congested',
      fsi: '1.1'
    },
    blueprintDetails: {
      nationalizedBankLoan: false,
      pmayScheme: false,
      type: 'offline',
      proposalCode: ''
    },
    stage: null,
    userTO :{
      id :null
    } // optional, will be set later
  };
  isEditMode = false;
  
  users: any[] = [];              // all users fetched from backend
  filteredUsers: any[] = [];      // filtered list for dropdown
  userSearchTerm: string = '';    // search input
  selectedUser: any = null;       // chosen user
  
  constructor(private userService: UserService,private projectService: ProjectService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.projectId) {
      // check route param if projectId not provided via Input
      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    }
    if (this.projectId) {
      this.isEditMode = true;
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (res) => {
          this.project = res; // populate form
                  // --- NEW: initialize selected user for edit mode ---
        if (this.project.userTO) {
          this.selectedUser = this.project.userTO; // assign existing user
          this.userSearchTerm = this.project.userTO.name + 
                                (this.project.userTO.mobileNumber ? ' (' + this.project.userTO.mobileNumber + ')' : '');
        }
        },
        error: (err) => console.error('❌ Error fetching project for edit:', err)
      });
    }
    this.userService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Error fetching users', err)
    });
  }

  // filter users by name or mobile as user types
  filterUsers() {
    const term = this.userSearchTerm.toLowerCase();
    if (term.length < 2) {
      this.filteredUsers = [];
      return;
    }
    this.filteredUsers = this.users.filter(u =>
      u.name?.toLowerCase().includes(term) ||
      u.mobileNumber?.toString().includes(term)
    );
  }

// When user clicks an option
selectUser(user: any) {
  this.selectedUser = user;
  // Assign the exact object backend expects
  this.project.userTO = { id: user.id, name: user.name, mobileNumber: user.mobileNumber };
  this.userSearchTerm = user.name + (user.mobileNumber ? ' (' + user.mobileNumber + ')' : '');
  this.filteredUsers = [];
  this.snackBar.open(`Selected user: ${user.name}`, 'OK', { duration: 2000 });
}


  
  
  onSubmit() {
      // Step 1: Validate user selection
  if (!this.selectedUser || !this.selectedUser.id) {
    this.snackBar.open('Please select a user before creating the project.', 'OK', { duration: 2500 });
    return;
  }

  // Step 2: Assign selected user ID to project
  this.project.userTO = { id: this.selectedUser.id };

    if (this.isEditMode) {
      console.log("updating project  "+this.project)
            console.log("updating project  "+this.project.userTO.id)
      this.projectService.updateProject(this.project.id, this.project).subscribe({
        next: (res) => {
          alert('✅ Project updated successfully!');
          this.router.navigate(['/projects']);
        },
        error: (err) => console.error('❌ Error updating project:', err)
      });
    } else {
      console.log("ADDING project  "+this.project)
      this.projectService.createProject(this.project).subscribe({
        next: (res) => {
          alert('✅ Project created successfully!');
          this.router.navigate(['/projects']);
        },
        error: (err) => console.error('❌ Error creating project:', err)
      });
    }
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class ProjectService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   // POST project
//   createProject(project: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/v1/project`, project, { responseType: 'text' });
//   }

//   getAllProjects(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

// }

export interface Project {
  id?: number;

  // Address related
  zone: 'agricultural' | 'commercial' | 'industrial';
  ubl: 'PMRDA' | 'TP' | 'Municipal corp.' | 'Gram panchayat';
  plotNo: string;
  landType: 'agricultural' | 'non-agricultural';
  congestion: 'congested' | 'non-congested';

  // Blueprint related
  blueprints: {
    loanProcess: boolean;   // required for nationalized bank loan
    pmayScheme: boolean;    // required for PMAY scheme
    type: 'online' | 'offline';
    proposalCode?: string;  // only for online case
  };

  // FSI
  fsi: '0.5' | '1.1' | '1.5';
}
