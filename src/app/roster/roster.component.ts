import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '../api-model';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Dictionary, groupBy } from 'lodash';

@Component({
  selector: 'app-roster',
  imports: [NgFor, MatGridListModule],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css',
})
export class RosterComponent implements OnInit {

  @Input()
  set rosters(value: ApiResponse[]) {
    this.groupByRosterName(value)
  }

  rosterNames: string[] = []
  groupedData: Dictionary<ApiResponse[]> = {}

  constructor() { }

  ngOnInit(): void { }

  groupByRosterName(value: ApiResponse[]) {
    this.groupedData = groupBy(value, 'RosterName')
    this.rosterNames = Object.keys(this.groupedData)

    console.log('rosterNames', this.rosterNames)
    console.log('groupedData', this.groupedData)
  }

  displayClassImg(className: string) {
    return `${className}.png`
  }

  openCharacterInfo(characterName: string) {
    window.open(`https://uwuowo.mathi.moe/character/CE/${characterName}`, '_blank');
  }
}
