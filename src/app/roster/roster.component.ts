import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse, Character } from '../api-model';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-roster',
  imports: [NgFor, MatGridListModule],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css',
})
export class RosterComponent implements OnInit {
  private _roster!: ApiResponse[];
  @Input()
  set rosters(value: ApiResponse[]) {
    this._roster = value
  } get rosters() {
    return this._roster;
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this._roster);
  }

  // Return 6 highest characters a.k.a. Main rostger
  getMainRoster(data: Character[]) {
    const mainRoster = data.sort((a, b) => b.ilvl - a.ilvl).slice(0, 6)
    return mainRoster;
  }

  normalizeClassName(className: string) {
    return `${className}.png`
  }

  openCharacterInfo(characterName: string) {
    window.open(`https://uwuowo.mathi.moe/character/CE/${characterName}`, '_blank');
  }
}
