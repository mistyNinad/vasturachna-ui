import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface User {
    id: number;
    name: string;
    mobileNumber: string;
    // Add other user fields as needed
}

// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {

  //private apiUrl = 'http://:8080/user';
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  searchUserByMobile(mobile: string): Observable<any> {
    return this.http.get<User | null>(`${this.apiUrl}/search?mobile=${mobile}`);
  }
}
