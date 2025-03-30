import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://lostark-roster-api.onrender.com/getRoster';

  constructor(private http: HttpClient) { }

  getRosters(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}