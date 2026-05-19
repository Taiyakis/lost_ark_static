import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalVariable } from '../environments/global-variables';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getRosters(): Observable<any> {
    return this.http.get(`${globalVariable.appConfig.api.endPoint}/getRoster?rostergroupid=${globalVariable.appConfig.api.staticId}`);
  }

  getHistory(): Observable<any> {
    return this.http.get(`${globalVariable.appConfig.api.endPoint}/getHistory?rostergroupid=${globalVariable.appConfig.api.staticId}`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${globalVariable.appConfig.api.endPoint}/getUser`, { withCredentials: true });
  }

  logoutUser(): Observable<any> {
    return this.http.get(`${globalVariable.appConfig.api.endPoint}/logout`, { withCredentials: true });
  }
}