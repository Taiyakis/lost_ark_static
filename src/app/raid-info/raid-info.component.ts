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
    this.groupByRoster(value);
  }

  groupedByRoster: string[] = ['Total'];
  raids = [
    {
      name: "Kazeros HM",
      raidLevelRequirement: 1730,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Kazeros NM",
      raidLevelRequirement: 1710,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Act 4 HM",
      raidLevelRequirement: 1720,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Act 4 NM",
      raidLevelRequirement: 1700,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Mordum HM",
      raidLevelRequirement: 1700,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Brel HM",
      raidLevelRequirement: 1690,
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  groupByRoster(value: ApiResponse[]) {
    const groupByRosterName = groupBy(value, 'RosterName')
    this.groupedByRoster = this.groupedByRoster.concat(Object.keys(groupByRosterName))
    for (let i = 1; i < this.groupedByRoster.length; i++) {
      const rosterName = this.groupedByRoster[i];
      for (let k = 0; k < groupByRosterName[rosterName].length; k++) {
        const char = groupByRosterName[rosterName][k];
        this.updateKazerosRunCount(0, i, char)
        this.updateAct4RunCount(2, i, char)
        this.updateMordumRunCount(4, i, char)
        this.updateBrelRunCount(5, i, char)
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

  updateTarkalRunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1720:
        // HM
        this.increamentRoleByClassName(rowIndex, indexToUpdate, char)
        break;
      case char.Level >= 1680:
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

  updateBrelRunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1690:
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
   * 1 - Kazeros HM
   * 2 - Kazeros NM
   * 3 - Act 4 HM
   * 4 - Act 4 NM
   * 5 - Mordum HM
   * 6 - Brel HM
   */
  increamentRoleByClassName(raidIndex: number, indexToUpdate: number, char: ApiResponse) {
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
}
