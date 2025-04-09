import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '../api-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor, NgStyle } from '@angular/common';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-raid-info',
  imports: [MatGridListModule, NgFor, NgStyle],
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
    { name: "Brel HM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Brel NM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Aegir HM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Aegir NM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
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
        this.updateBrelRunCount(i, char.Level)
        this.updateAegirRunCount(i, char.Level)
      }
    }
  }

  updateBrelRunCount(indexToUpdate: number, ilvl: number) {
    switch (true) {
      case ilvl >= 1690:
        // HM
        this.raids[0].values[indexToUpdate] += 1;
        break;
      case ilvl >= 1670:
        // NM
        this.raids[1].values[indexToUpdate] += 1;
        break;
      default:
        break;
    }
  }

  updateAegirRunCount(indexToUpdate: number, ilvl: number) {
    switch (true) {
      case ilvl >= 1680:
        // HM
        this.raids[2].values[indexToUpdate] += 1;
        break;
      case ilvl >= 1660:
        // NM
        this.raids[3].values[indexToUpdate] += 1;
        break;
      default:
        break;
    }
  }
}
