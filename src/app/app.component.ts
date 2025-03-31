import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RosterComponent } from './roster/roster.component';
import { RaidInfoComponent } from './raid-info/raid-info.component';
import { ApiResponse } from './api-model';
import { ApiService } from '../services/api.service';
import { catchError, delay, first, retry, retryWhen, scan, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RosterComponent, RaidInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent implements OnInit {
  status = 'pending';
  rostersData: ApiResponse[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getRosters()
  }

  getRosters() {
    this.api.getRosters().pipe(
      retry({
        count: 6,
        delay: (_, retryCount) => {
          console.warn(`Retry attempt #${retryCount} in 10s...`);
          this.status = 'pending';
          return timer(10000);
        }
      }),
      catchError(error => {
        return throwError(() => new Error('API request failed!'));
      })
    ).subscribe({
      next: (data) => {
        this.rostersData = data;
        this.status = 'success'
      },
      error: (err) => {
        this.status = 'error'
      }
    })
  }
}
