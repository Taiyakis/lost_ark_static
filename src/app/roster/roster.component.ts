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
  averageRosterLevel: any = {};
  averageRosterCombatPower: any = {};
  currentFilter: string = 'weekly';
  currentRosterFilter: string = 'HighestCombatPower';

  filtersBy = {
    HighestCombatPower: [''],
    AverageCombatPower: [''],
    LowestCombatPower: [''],
    HighestLevel: [''],
    AverageLevel: [''],
    LowestLevel: [''],
  }

  // Banner img src
  banner: any = {
    Madeline: 'mad.png',
    Syron: 'syron.jpeg',
    Everlasting: 'everlasting.jpeg',
    Compleo: 'compleo.png',
    Magnatas: 'magnatas.png',
    Siose: 'siose.png',
    Taiyakis: 'taiyaki.png',
    Deadlybrother: 'deadly.png'
  }

  constructor(private api: ApiService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  groupByRosterName(value: ApiResponse[]) {
    this.groupedData = groupBy(value, 'RosterName')
    this.rosterNames = Object.keys(this.groupedData)
    this.plainRosterData = value;

    this.precalculateFilterResults();

    console.log('rosterNames', this.rosterNames)
    console.log('groupedData', this.groupedData)
  }

  precalculateFilterResults() {
    // Calculating Avarage Level
    this.filtersBy['HighestLevel'] = Object.keys(this.groupedData);
    this.filtersBy['LowestLevel'] = Object.keys(this.groupedData).reverse();

    const unsortedData = [];
    for (const key in this.groupedData) {
      if (this.groupedData.hasOwnProperty(key)) {
        const group = this.groupedData[key];
        let avarageLevel = 0;
        let avarageCombatPower = 0;
        let highestCombatPower: number = 0;
        for (let i = 0; i < group.length; i++) {
          const level: string = group[i].Level.toString();
          avarageLevel += parseFloat(level);
          const score: string = group[i].Score.toString();
          avarageCombatPower += parseFloat(score)

          if (highestCombatPower < group[i].Score)
            highestCombatPower = group[i].Score;
        }

        unsortedData.push({ name: key, level: Math.round((avarageLevel / 6) * 100) / 100, score: Math.round((avarageCombatPower / 6) * 100) / 100, highestCombatPower: Math.round((highestCombatPower) * 100) / 100 })
      }
    }
    unsortedData.forEach(data => {
      this.averageRosterLevel[data.name] = data.level;
      this.averageRosterCombatPower[data.name] = data.score;
    });

    unsortedData.sort((a, b) => b.level - a.level)
    this.filtersBy['AverageLevel'] = unsortedData.map(a => (a.name))

    // Calculating avarage 
    unsortedData.sort((a, b) => b.score - a.score)
    this.filtersBy['AverageCombatPower'] = unsortedData.map(a => (a.name))

    unsortedData.sort((a, b) => b.highestCombatPower - a.highestCombatPower)
    this.filtersBy['HighestCombatPower'] = unsortedData.map(a => (a.name))
    this.filtersBy['LowestCombatPower'] = unsortedData.map(a => (a.name)).reverse()
  }

  displayClassImg(className: string) {
    return `${className}.png`
  }

  displayRoleIcon(IsSupport: boolean) {
    return (IsSupport)
      ? 'support.png'
      : 'damage.png';
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

  onRosterFilterChanged(filterType: string) {
    this.currentRosterFilter = filterType;
    switch (filterType) {
      case 'HighestCombatPower':
        this.rosterNames = this.filtersBy['HighestCombatPower'];
        break;
      case 'AverageCombatPower':
        this.rosterNames = this.filtersBy['AverageCombatPower'];
        break;
      case 'LowestCombatPower':
        this.rosterNames = this.filtersBy['LowestCombatPower'];
        break;
      case 'HighestLevel':
        this.rosterNames = this.filtersBy['HighestLevel'];
        break;
      case 'AverageLevel':
        this.rosterNames = this.filtersBy['AverageLevel'];
        break;
      case 'LowestLevel':
        this.rosterNames = this.filtersBy['LowestLevel'];
        break;
      default:
        break;
    }
  }
}
