import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RosterComponent } from './roster/roster.component';
import { RaidInfoComponent } from './raid-info/raid-info.component';
import { ApiResponse } from './api-model';
import { ApiService } from '../services/api.service';
import { catchError, retry, throwError, timer } from 'rxjs';
import { NgIf } from '@angular/common';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RosterComponent, RaidInfoComponent, NgIf, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent implements OnInit {
  // Spinner mode
  mode: ProgressSpinnerMode = 'indeterminate';

  // Api status
  status = 'pending';
  isLoading = false;
  apiRetryCount = 6;

  // Api response
  rostersData: ApiResponse[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getRosters()
  }

  getRosters() {
    this.api.getRosters().pipe(
      retry({
        count: this.apiRetryCount,
        delay: (_, retryCount) => {
          console.warn(`Retry attempt #${retryCount} in 5s...`);
          this.setStatus('pending', true)
          return timer(5000);
        }
      }),
      catchError(error => {
        return throwError(() => new Error('API request failed!'));
      })
    ).subscribe({
      next: (data: ApiResponse[]) => {
        this.rostersData = data;
        this.setStatus('success', false)
      },
      error: (err) => {
        this.setStatus('error', true)
      }
    })
  }

  setStatus(status: string, isLoading: boolean) {
    this.status = status;
    this.isLoading = isLoading;
  }
}
