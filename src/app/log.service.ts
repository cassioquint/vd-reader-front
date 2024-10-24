import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/';

  // Subjects para armazenar logs e nome de arquivo
  private logsSubject = new BehaviorSubject<any[]>([]);
  private fileSubject = new BehaviorSubject<string>('');

  // Expor os observables para acesso externo
  logs$ = this.logsSubject.asObservable();
  file$ = this.fileSubject.asObservable();

  constructor(private http: HttpClient) {}

  getLogs(date?: string): Observable<any[]> {
    let currentDate = new Date().toISOString().split('T')[0];
    if (currentDate === date) {
        date = ""
    }

    const url = date ? `${this.apiUrl}${date}` : this.apiUrl;
    return this.http.get<any[]>(url).pipe(
      tap((response: any) => {
        const logData = response?.data || [];
        this.logsSubject.next(logData);
        this.fileSubject.next(response.file);
      })
    );
  }

  openFile(lineNumber: number, fileName: string): Observable<any[]> {
    const url = `${this.apiUrl}open-file`;
    const body = { lineNumber, fileName };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });

    /*
    const url = `${this.apiUrl}line/${lineNumber}`;
    return this.http.get<any[]>(url);
    */
  }
}