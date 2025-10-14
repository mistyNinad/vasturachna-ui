import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiUrl = 'http://localhost:8080/api/v1/stage'; // adjust if needed

  constructor(private http: HttpClient) {}

  getStagesByProject(projectId: number): Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/project/${projectId}`);
    return this.http.get<any[]>(`${this.apiUrl}/stages`);
  }
}
