import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Stage {
  id: number;
  name: string;
  description: string;
  paymentPercentage: number;
  orderIndex: number;
  parentid: number;
}

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiUrl = environment.apiUrl+'/api/v1/stage';

  constructor(private http: HttpClient) {}

getAllStages(mainOnly: boolean = false): Observable<any[]> {

  const options = mainOnly
    ? { params: { mainOnly: 'true' } }
    : {};
    console.log(mainOnly)
    console.log(options)

  return this.http.get<any[]>(`${this.apiUrl}`, options);
}




  updateStage(stage: Stage): Observable<Stage> {
    console.log(stage);
    return this.http.put<Stage>(`${this.apiUrl}/${stage.id}/payment`, stage);
  }

}
