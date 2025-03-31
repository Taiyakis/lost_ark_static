import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '../api-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-raid-info',
  imports: [MatGridListModule, NgFor, NgStyle],
  templateUrl: './raid-info.component.html',
  styleUrl: './raid-info.component.css'
})

export class RaidInfoComponent implements OnInit {
  private _rosters!: ApiResponse[];
  @Input()
  set rosters(value: ApiResponse[]) {
    this._rosters = value
    this.updateTableInfo();
  } get rosters() {
    return this._rosters;
  }

  raids = [
    { name: "Brel HM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Brel NM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Aegir HM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Aegir NM", values: [0, 0, 0, 0, 0, 0, 0, 0] },
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  updateTableInfo() {
    for (let index = 0; index < this.rosters.length; index++) {
      // Get main 6 chars
      const mainRoster = this.rosters[index].characters.sort((a, b) => b.ilvl - a.ilvl).slice(0, 6)
      mainRoster.forEach(character => {
        this.updateBrelRunCount(index, character.ilvl)
        this.updateAegirRunCount(index, character.ilvl)
      });
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
