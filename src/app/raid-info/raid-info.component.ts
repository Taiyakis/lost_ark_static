import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '../api-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-raid-info',
  imports: [MatGridListModule, NgFor, NgStyle, NgClass],
  templateUrl: './raid-info.component.html',
  styleUrl: './raid-info.component.css'
})

export class RaidInfoComponent implements OnInit {
  @Input()
  set rosters(value: ApiResponse[]) {
    if (value.length == 0)
      return;

    this.groupByRoster(value);
  }

  groupedByRoster: string[] = ['Total'];
  raids = [
    {
      name: "Kazeros HM",
      raidLevelRequirement: 1730,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Kazeros NM",
      raidLevelRequirement: 1710,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Act 4 HM",
      raidLevelRequirement: 1720,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Act 4 NM",
      raidLevelRequirement: 1700,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Mordum HM",
      raidLevelRequirement: 1700,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    }
  ];

  characterRaidCount: { [key: string]: number } = {};

  constructor() { }

  ngOnInit(): void { }

  generateColumns(count: number) {
    this.raids.forEach((raid) => {
      for (let index = 0; index < count; index++) {
        raid.values.push({ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] })
      }
    })
  }

  groupByRoster(value: ApiResponse[]) {
    const groupByRosterName = groupBy(value, 'RosterName')
    this.generateColumns(Object.keys(groupByRosterName).length)
    this.groupedByRoster = this.groupedByRoster.concat(Object.keys(groupByRosterName))
    for (let i = 1; i < this.groupedByRoster.length; i++) {
      const rosterName = this.groupedByRoster[i];
      for (let k = 0; k < groupByRosterName[rosterName].length; k++) {
        const char = groupByRosterName[rosterName][k];
        this.initializeCharacterRaidCount(char)
        this.updateKazerosRunCount(0, i, char)
        this.updateAct4RunCount(2, i, char)
        this.updateMordumRunCount(4, i, char)
      }
    }
  }

  updateKazerosRunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1730:
        // HM
        this.increamentRoleByClassName(rowIndex, indexToUpdate, char)
        break;
      case char.Level >= 1710:
        // NM
        this.increamentRoleByClassName(rowIndex + 1, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  updateAct4RunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1720:
        // HM
        this.increamentRoleByClassName(rowIndex, indexToUpdate, char)
        break;
      case char.Level >= 1700:
        // NM
        this.increamentRoleByClassName(rowIndex + 1, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  updateMordumRunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1700:
        // HM
        this.increamentRoleByClassName(rowIndex, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  /**
   * Increament dps or supp for specific raid
   * 0 - Total
   * 1 - FoD Tarkal HM
   * 2 - FoD Tarkal NM
   * 3 - Mordum HM
   * 4 - Mordum NM
   * 5 - Brel HM
   * 6 - Aegir HM
   */
  increamentRoleByClassName(raidIndex: number, indexToUpdate: number, char: ApiResponse, ignore: boolean = false) {
    if (this.isMaximumRaidCountReached(char) && !ignore)
      return;

    if (!ignore)
      this.characterRaidCount[char.CharacterName] += 1;

    if (char.IsSupport) {
      this.raids[raidIndex].values[indexToUpdate].supp += 1
      this.raids[raidIndex].values[indexToUpdate].suppNames.push(char.CharacterName)
      this.raids[raidIndex].values[0].supp += 1;
      this.raids[raidIndex].values[0].suppNames.push(char.CharacterName)
    } else {
      this.raids[raidIndex].values[indexToUpdate].dps += 1
      this.raids[raidIndex].values[indexToUpdate].dpsNames.push(char.CharacterName)
      this.raids[raidIndex].values[0].dps += 1;
      this.raids[raidIndex].values[0].dpsNames.push(char.CharacterName)
    }
  }

  isMaximumRaidCountReached(char: ApiResponse): boolean {
    return this.characterRaidCount[char.CharacterName] === 3
  }

  initializeCharacterRaidCount(char: ApiResponse) {
    this.characterRaidCount[char.CharacterName] = 0;
  }
}

