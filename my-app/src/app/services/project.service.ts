import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //private apiUrl = 'http://localhost:8080/api/v1/project/projects'; // backend URL

  private apiUrl = environment.apiUrl+'/api/v1/project';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  getProjectById(id: number) {
    return this.http.get<any>(this.apiUrl+`/${id}`);
  }

      
  // Update project
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(this.apiUrl+`/${id}`, project);
  }

  advanceStage(projectId: number, userId: number) {
    return this.http.post<any>(this.apiUrl+`/${projectId}/advance-stage`, { userId });
  }

  // project.service.ts (add)
getStageProgressions(projectId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/${projectId}/stage-progressions`);
}

}
