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

  groupedByRoster: string[] = [];
  raids = [
    {
      name: "Mordum HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Mordum NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Brel HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Brel NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Aegir HM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
    {
      name: "Aegir NM",
      values: [{ dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }, { dps: 0, supp: 0, dpsNames: [''], suppNames: [''] }],
    },
  ];

  constructor() { }

  ngOnInit(): void {

  }

  groupByRoster(value: ApiResponse[]) {
    const groupByRosterName = groupBy(value, 'RosterName')
    this.groupedByRoster = Object.keys(groupByRosterName)

    for (let i = 0; i < this.groupedByRoster.length; i++) {
      const rosterName = this.groupedByRoster[i];
      for (let k = 0; k < groupByRosterName[rosterName].length; k++) {
        const char = groupByRosterName[rosterName][k];
        this.updateMordumRunCount(i, char)
        this.updateBrelRunCount(i, char)
        this.updateAegirRunCount(i, char)
      }
    }
  }

  updateMordumRunCount(indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1700:
        // HM
        this.increamentRoleByClassName(0, indexToUpdate, char)
        break;
      case char.Level >= 1680:
        // NM
        this.increamentRoleByClassName(1, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  updateBrelRunCount(indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1690:
        // HM
        this.increamentRoleByClassName(2, indexToUpdate, char)
        break;
      case char.Level >= 1670:
        // NM
        this.increamentRoleByClassName(3, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  updateAegirRunCount(indexToUpdate: number, char: ApiResponse) {
    switch (true) {
      case char.Level >= 1680:
        // HM
        this.increamentRoleByClassName(4, indexToUpdate, char)
        break;
      case char.Level >= 1660:
        // NM
        this.increamentRoleByClassName(5, indexToUpdate, char)
        break;
      default:
        break;
    }
  }

  /**
   * Increament dps or supp for specific raid
   * 0 - Brel HM
   * 1 - Brel NM
   * 2 - Aegir HM
   * 3 - Aegir NM
   */
  increamentRoleByClassName(raidIndex: number, indexToUpdate: number, char: ApiResponse) {
    if (this.isSupport(char.ClassName)) {
      this.raids[raidIndex].values[indexToUpdate].supp += 1
      this.raids[raidIndex].values[indexToUpdate].suppNames.push(char.CharacterName)
    } else {
      this.raids[raidIndex].values[indexToUpdate].dps += 1
      this.raids[raidIndex].values[indexToUpdate].dpsNames.push(char.CharacterName)
    }
  }

  isSupport(className: string): boolean {
    return (['Bard', 'Paladin', 'Artist'].indexOf(className) >= 0)
  }
}
