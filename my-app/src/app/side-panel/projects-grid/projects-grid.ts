import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projects-grid',
  imports: [CommonModule],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.css'
})
export class ProjectsGrid {
  projects: any[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('❌ Error fetching projects:', err);
      }
    });
  }

  viewDetails(projectId: number) {
    console.log("Navigating to project:", projectId); // debug
    this.router.navigate(['/projects', projectId]);
  }
  editProject(projectId: number) {
    this.router.navigate(['/projects/edit', projectId]);
  }

  createNewProject(){}
}
