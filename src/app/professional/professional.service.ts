import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private apiUrl = 'http://localhost:8080/api/professionals';

  constructor(private http: HttpClient) {}

  searchProfessionals(filters: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: filters });
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  createService(service: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/services`, service);
  }

  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${serviceId}`);
  }
}
