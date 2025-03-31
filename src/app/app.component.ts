import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RosterComponent } from './roster/roster.component';
import { RaidInfoComponent } from './raid-info/raid-info.component';
import { ApiResponse } from './api-model';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RosterComponent, RaidInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent implements OnInit {
  rostersData: ApiResponse[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRosters().pipe(first()).subscribe((data) => {
      this.rostersData = data;
    })
  }
}
