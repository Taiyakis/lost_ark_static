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
      name: "Strike HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Strike NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Mordum HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Mordum NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Brel HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Brel NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Aegir HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    // {
    //   name: "Aegir NM",
    //   values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    // },
  ];

  constructor() { }

  ngOnInit(): void {

  }

  groupByRoster(value: ApiResponse[]) {
    const groupByRosterName = groupBy(value, 'RosterName')
    // this.groupedByRoster = Object.keys(groupByRosterName)
    this.groupedByRoster = this.groupedByRoster.concat(Object.keys(groupByRosterName))
    for (let i = 1; i < this.groupedByRoster.length; i++) {
      const rosterName = this.groupedByRoster[i];
      for (let k = 0; k < groupByRosterName[rosterName].length; k++) {
        const char = groupByRosterName[rosterName][k];
        this.updateTarkalRunCount(0, i, char)
        this.updateMordumRunCount(2, i, char)
        this.updateBrelRunCount(4, i, char)
        this.updateAegirRunCount(6, i, char)
      }
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
      case char.Level >= 1680:
        // NM
        this.increamentRoleByClassName(rowIndex + 1, indexToUpdate, char)
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
      case char.Level >= 1670:
        // NM
        this.increamentRoleByClassName(rowIndex + 1, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  updateAegirRunCount(rowIndex: number, indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1680:
        // HM
        this.increamentRoleByClassName(rowIndex, indexToUpdate, char)
        break;
      // This raid is irelevant now
      // case char.Level >= 1660:
      //   // NM
      //   this.increamentRoleByClassName(rowIndex + 1, indexToUpdate, char)
      //   break;
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
   * 6 - Brel NM
   * 7 - Aegir HM
   * 8 - Aegir NM
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
