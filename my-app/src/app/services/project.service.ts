import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/api/v1/project/projects'; // backend URL

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/project', project);
  }

  getProjectById(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/v1/project/${id}`);
  }

      
  // Update project
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/v1/project/${id}`, project);
  }

  advanceStage(projectId: number, userId: number) {
    return this.http.post<any>(`http://localhost:8080/api/v1/project/${projectId}/advance-stage`, { userId });
  }
}
