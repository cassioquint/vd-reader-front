import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getLogs(date?: string): Observable<any[]> {

    let currentDate = new Date().toISOString().split('T')[0];
    if (currentDate === date) {
        date = ""
    }

    const url = date ? `${this.apiUrl}${date}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  openFile(lineNumber: number): Observable<any[]> {
    const url = `${this.apiUrl}line/${lineNumber}`;
    return this.http.get<any[]>(url);
  }
}