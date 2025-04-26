import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ApiResponse, HistoryResponse } from '../api-model';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Dictionary, find, groupBy, isEmpty } from 'lodash';
import { ApiService } from '../../services/api.service';
import { catchError, retry, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-roster',
  imports: [NgFor, MatGridListModule, NgStyle, NgClass],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css',
})
export class RosterComponent implements OnInit {

  @Input()
  set rosters(value: ApiResponse[]) {
    if (isEmpty(value))
      return;

    this.getHistory();
    this.groupByRosterName(value)
  }

  rosterNames: string[] = []
  groupedData: Dictionary<ApiResponse[]> = {}
  charactersHistory: HistoryResponse[] = [];
  plainRosterData: ApiResponse[] = [];
  filteredHistory: HistoryResponse[] = [];
  currentFilter: string = 'weekly';

  // Banner img src
  banner: any = {
    Madeline: 'https://cdn.discordapp.com/banners/151149364956495873/a_b98d82cf670b30b3e16c45132dd62cba.gif?size=480',
    Syron: 'https://cdn.discordapp.com/banners/209351855338160129/a_6da3f94f6a7066d9ed759edb08188800.gif?size=480',
    Everlasting: 'https://cdn.discordapp.com/banners/231776360253751296/a_df4d57056a385c9e57f7ab9e184d4d43.gif?size=480',
    Compleo: '',
    Magnatas: '',
    Siose: '',
    Taiyakis: 'https://cdn.discordapp.com/banners/160900248602935296/8772f8263af5af126c62734b23de437d.png?size=480',
    Deadlybrother: ''
  }

  constructor(private api: ApiService, private renderer: Renderer2) { }

  ngOnInit(): void { }

  groupByRosterName(value: ApiResponse[]) {
    this.groupedData = groupBy(value, 'RosterName')
    this.rosterNames = Object.keys(this.groupedData)
    this.plainRosterData = value;

    console.log('rosterNames', this.rosterNames)
    console.log('groupedData', this.groupedData)
  }

  displayClassImg(className: string) {
    return `${className}.png`
  }

  openCharacterInfo(characterName: string) {
    window.open(`https://uwuowo.mathi.moe/character/CE/${characterName}`, '_blank');
  }

  getHistory() {
    this.api.getHistory().pipe(
      retry({
        count: 6,
        delay: (_, retryCount) => {
          console.warn(`Retry attempt #${retryCount} in 5s...`);
          return timer(5000);
        }
      }),
      catchError(error => {
        return throwError(() => new Error('API request failed!'));
      })
    ).subscribe({
      next: (data: HistoryResponse[]) => {
        this.charactersHistory = data;
        this.applyFilter('weekly');
      },
      error: (err) => {
      }
    })
  }

  isCharacterChanged(characterName: string): boolean {
    if (isEmpty(this.charactersHistory))
      return false;

    return !isEmpty(find(this.charactersHistory, { 'CharacterName': characterName }))
  }

  getLevelChanges(characterName: string, isLevelProvided: boolean, currentLevel?: number) {
    if (isEmpty(this.charactersHistory))
      return null;

    const char = find(this.charactersHistory, { 'CharacterName': characterName, 'FilterType': this.currentFilter })
    if (isEmpty(char))
      return null;

    currentLevel = currentLevel ?? find(this.plainRosterData, { 'CharacterName': characterName })?.Level ?? 0;

    const levelIncreasedBy = (currentLevel! - char.Level).toFixed(2)
    return `+${levelIncreasedBy}`;
  }

  onFilterChange(filterType: string) {
    this.currentFilter = filterType;
    this.applyFilter(filterType);
  }

  private applyFilter(filterType: string) {
    this.filteredHistory = this.charactersHistory.filter(data => (data.FilterType == filterType));
  }

  addHighlightClass(characterName: string) {
    const el = document.getElementById(characterName);
    if (el) {
      this.renderer.addClass(el, 'highlight');
      setTimeout(() => {
        this.renderer.removeClass(el, 'highlight');
      }, 4000);
    }
  }
}
