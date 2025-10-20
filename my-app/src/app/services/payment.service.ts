import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Payment {
  id?: number;
  projectId: number;
  payerId: number;
  amount: number;
  paymentMode: string;
  referenceNumber?: string;
  remarks?: string;
  statusCode?: string;
  paidOn?: string;
}

export interface PaymentSummary {
  id?: number;
  projectId: number;
  estimatedCost: number;
  totalPaid: number;
  percentCompleted: number;
  dueAmount?: number;
  payments?: Payment[];
}




@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //private apiUrl = 'http://localhost:8080/api/v1/payments';
  private apiUrl = environment.apiUrl+'/api/v1/payments';

  constructor(private http: HttpClient) {}

  getPaymentsByProject(projectId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/project/${projectId}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentId}`);
  }
}
