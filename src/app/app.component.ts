import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RosterComponent } from './roster/roster.component';
import { RaidInfoComponent } from './raid-info/raid-info.component';
import { ApiResponse } from './api-model';
import { ApiService } from '../api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RosterComponent, RaidInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent implements OnInit {
  mockData: ApiResponse[] = [
    {
      "mainCharacterName": "Taiyakis",
      "characters": [
        {
          "name": "Mindusia",
          "class": "Deathblade",
          "ilvl": 1675,
          "last_updated": "3/30/2025, 8:58:19 PM"
        },
        {
          "name": "Furryball",
          "class": "Wildsoul",
          "ilvl": 1585,
          "last_updated": "3/30/2025, 8:01:18 PM"
        },
        {
          "name": "Taiyakis",
          "class": "Sorceress",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:44:55 PM"
        },
        {
          "name": "Fenikse",
          "class": "Glaivier",
          "ilvl": 1600.8334,
          "last_updated": "3/30/2025, 8:53:46 PM"
        },
        {
          "name": "Constëllation",
          "class": "Bard",
          "ilvl": 1690.3334,
          "last_updated": "3/30/2025, 9:08:14 PM"
        },
        {
          "name": "Kortele",
          "class": "Arcanist",
          "ilvl": 1702.5,
          "last_updated": "3/30/2025, 8:52:29 PM"
        },
        {
          "name": "Kamyaki",
          "class": "Souleater",
          "ilvl": 1560,
          "last_updated": "3/30/2025, 9:19:51 PM"
        },
        {
          "name": "Unparalleled",
          "class": "Arcanist",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:42:17 PM"
        },
        {
          "name": "Lünätic",
          "class": "Paladin",
          "ilvl": 1640,
          "last_updated": "3/30/2025, 8:27:29 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Deadlybrother",
      "characters": [
        {
          "name": "Deadlyreap",
          "class": "Reaper",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:56:33 PM"
        },
        {
          "name": "Deadlysumm",
          "class": "Summoner",
          "ilvl": 1550,
          "last_updated": "3/30/2025, 9:10:43 PM"
        },
        {
          "name": "Deadlybrother",
          "class": "Sharpshooter",
          "ilvl": 1701.6666,
          "last_updated": "3/30/2025, 8:24:39 PM"
        },
        {
          "name": "Deadlyi",
          "class": "Deathblade",
          "ilvl": 1692.5,
          "last_updated": "3/30/2025, 8:34:46 PM"
        },
        {
          "name": "Deadlyboreka",
          "class": "Breaker",
          "ilvl": 1600.8334,
          "last_updated": "3/30/2025, 8:34:08 PM"
        },
        {
          "name": "Deadlydrizzle",
          "class": "Aeromancer",
          "ilvl": 1640,
          "last_updated": "3/30/2025, 8:48:37 PM"
        },
        {
          "name": "Deadlyws",
          "class": "Wildsoul",
          "ilvl": 1643,
          "last_updated": "3/30/2025, 7:57:35 PM"
        },
        {
          "name": "Deadlys",
          "class": "Bard",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:49:33 PM"
        },
        {
          "name": "Deadlytama",
          "class": "Souleater",
          "ilvl": 1684.1666,
          "last_updated": "3/30/2025, 8:39:31 PM"
        },
        {
          "name": "Deadlybro",
          "class": "Glaivier",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:45:43 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Compleo",
      "characters": [
        {
          "name": "Fistursis",
          "class": "Breaker",
          "ilvl": 1620,
          "last_updated": "3/30/2025, 8:24:48 PM"
        },
        {
          "name": "Dmbb",
          "class": "Glaivier",
          "ilvl": 1585.8334,
          "last_updated": "3/30/2025, 8:00:46 PM"
        },
        {
          "name": "Meskiuke",
          "class": "Wildsoul",
          "ilvl": 1680.8334,
          "last_updated": "3/30/2025, 7:57:35 PM"
        },
        {
          "name": "Kerétoja",
          "class": "Sorceress",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 9:04:57 PM"
        },
        {
          "name": "Dazytojaone",
          "class": "Artist",
          "ilvl": 1620,
          "last_updated": "3/30/2025, 8:00:53 PM"
        },
        {
          "name": "Afrikosas",
          "class": "Gunlancer",
          "ilvl": 1613.3334,
          "last_updated": "3/30/2025, 8:48:49 PM"
        },
        {
          "name": "Dmdd",
          "class": "Paladin",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:16:11 PM"
        },
        {
          "name": "Sienautoja",
          "class": "Souleater",
          "ilvl": 1705.8334,
          "last_updated": "3/30/2025, 9:21:53 PM"
        },
        {
          "name": "Compleo",
          "class": "Gunslinger",
          "ilvl": 1700,
          "last_updated": "3/30/2025, 8:14:31 PM"
        },
        {
          "name": "Burtininké",
          "class": "Summoner",
          "ilvl": 1683.3334,
          "last_updated": "3/30/2025, 8:47:27 PM"
        },
        {
          "name": "Mazamete",
          "class": "Aeromancer",
          "ilvl": 1663.3334,
          "last_updated": "3/30/2025, 8:30:37 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Magnatas",
      "characters": [
        {
          "name": "Skautas",
          "class": "Machinist",
          "ilvl": 1540,
          "last_updated": "2/8/2025, 2:15:29 PM"
        },
        {
          "name": "Cyzzas",
          "class": "Gunlancer",
          "ilvl": 1680.8334,
          "last_updated": "3/30/2025, 8:43:49 PM"
        },
        {
          "name": "Bulveg",
          "class": "Breaker",
          "ilvl": 1661.6666,
          "last_updated": "3/30/2025, 8:36:27 PM"
        },
        {
          "name": "Arthahas",
          "class": "Paladin",
          "ilvl": 1604.1666,
          "last_updated": "3/30/2025, 8:52:05 PM"
        },
        {
          "name": "Antibanana",
          "class": "Gunslinger",
          "ilvl": 1670,
          "last_updated": "3/30/2025, 8:43:42 PM"
        },
        {
          "name": "Walytoja",
          "class": "Glaivier",
          "ilvl": 1555,
          "last_updated": "2/9/2025, 5:44:19 PM"
        },
        {
          "name": "Boksininkas",
          "class": "Breaker",
          "ilvl": 1705.8334,
          "last_updated": "3/30/2025, 8:48:21 PM"
        },
        {
          "name": "Medeíná",
          "class": "Slayer",
          "ilvl": 1690,
          "last_updated": "3/30/2025, 8:49:51 PM"
        },
        {
          "name": "Raganè",
          "class": "Summoner",
          "ilvl": 1603.3334,
          "last_updated": "3/30/2025, 8:46:24 PM"
        },
        {
          "name": "Kaubojus",
          "class": "Deadeye",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 7:55:26 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Everlasting",
      "characters": [
        {
          "name": "Everlasting",
          "class": "Bard",
          "ilvl": 1708.3334,
          "last_updated": "3/30/2025, 8:48:21 PM"
        },
        {
          "name": "Qualitytapxv",
          "class": "Breaker",
          "ilvl": 1640.8334,
          "last_updated": "3/30/2025, 9:02:32 PM"
        },
        {
          "name": "Magisa",
          "class": "Sorceress",
          "ilvl": 1556.6666,
          "last_updated": "3/30/2025, 8:40:52 PM"
        },
        {
          "name": "Rancor",
          "class": "Gunslinger",
          "ilvl": 1566.6666,
          "last_updated": "3/30/2025, 8:58:33 PM"
        },
        {
          "name": "Euphoria",
          "class": "Deathblade",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:29:40 PM"
        },
        {
          "name": "Paramíta",
          "class": "Scrapper",
          "ilvl": 1581.6666,
          "last_updated": "3/30/2025, 8:40:20 PM"
        },
        {
          "name": "Fonje",
          "class": "Souleater",
          "ilvl": 1696.6666,
          "last_updated": "3/30/2025, 8:24:15 PM"
        },
        {
          "name": "Babyarcana",
          "class": "Arcanist",
          "ilvl": 1700.8334,
          "last_updated": "3/30/2025, 8:50:32 PM"
        },
        {
          "name": "Aoi",
          "class": "Glaivier",
          "ilvl": 1571.6666,
          "last_updated": "3/30/2025, 8:12:28 PM"
        },
        {
          "name": "Eversama",
          "class": "Slayer",
          "ilvl": 1670,
          "last_updated": "3/30/2025, 8:14:36 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Madeline",
      "characters": [
        {
          "name": "Sadiny",
          "class": "Sorceress",
          "ilvl": 1540,
          "last_updated": "3/30/2025, 8:55:24 PM"
        },
        {
          "name": "Madlota",
          "class": "Arcanist",
          "ilvl": 1585.8334,
          "last_updated": "3/30/2025, 9:05:04 PM"
        },
        {
          "name": "Madison",
          "class": "Bard",
          "ilvl": 1589.1666,
          "last_updated": "3/30/2025, 8:37:09 PM"
        },
        {
          "name": "Madragón",
          "class": "Reaper",
          "ilvl": 1490,
          "last_updated": "3/30/2025, 8:30:26 PM"
        },
        {
          "name": "Madlyn",
          "class": "Gunslinger",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:34:43 PM"
        },
        {
          "name": "Madaruman",
          "class": "Paladin",
          "ilvl": 1580,
          "last_updated": "3/30/2025, 9:08:12 PM"
        },
        {
          "name": "Madalora",
          "class": "Souleater",
          "ilvl": 1623.8334,
          "last_updated": "3/30/2025, 8:28:01 PM"
        },
        {
          "name": "Madnuoli",
          "class": "Sharpshooter",
          "ilvl": 1523.3334,
          "last_updated": "3/30/2025, 8:17:44 PM"
        },
        {
          "name": "Maddy",
          "class": "Machinist",
          "ilvl": 1523.3334,
          "last_updated": "3/30/2025, 8:26:19 PM"
        },
        {
          "name": "Madiny",
          "class": "Sorceress",
          "ilvl": 1642.5,
          "last_updated": "3/30/2025, 8:32:49 PM"
        },
        {
          "name": "Bakingmad",
          "class": "Breaker",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 8:11:23 PM"
        },
        {
          "name": "Madalorei",
          "class": "Souleater",
          "ilvl": 1585,
          "last_updated": "3/30/2025, 9:17:54 PM"
        },
        {
          "name": "Madcule",
          "class": "Berserker",
          "ilvl": 1490,
          "last_updated": "3/30/2025, 9:15:52 PM"
        },
        {
          "name": "Madeline",
          "class": "Shadowhunter",
          "ilvl": 1713.3334,
          "last_updated": "3/30/2025, 9:08:08 PM"
        },
        {
          "name": "Swaygod",
          "class": "Shadowhunter",
          "ilvl": 1670,
          "last_updated": "3/30/2025, 8:11:08 PM"
        },
        {
          "name": "Madleine",
          "class": "Deathblade",
          "ilvl": 1523.3334,
          "last_updated": "3/30/2025, 8:29:46 PM"
        },
        {
          "name": "Madumbra",
          "class": "Souleater",
          "ilvl": 1585,
          "last_updated": "3/30/2025, 8:04:13 PM"
        },
        {
          "name": "Sadeline",
          "class": "Shadowhunter",
          "ilvl": 1670,
          "last_updated": "3/30/2025, 8:23:22 PM"
        },
        {
          "name": "Madonna",
          "class": "Souleater",
          "ilvl": 1692.5,
          "last_updated": "3/30/2025, 8:54:17 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Syron",
      "characters": [
        {
          "name": "Syronskyy",
          "class": "Aeromancer",
          "ilvl": 1640,
          "last_updated": "3/30/2025, 8:54:42 PM"
        },
        {
          "name": "Syronpaw",
          "class": "Wildsoul",
          "ilvl": 1585,
          "last_updated": "3/30/2025, 8:09:36 PM"
        },
        {
          "name": "Syronlol",
          "class": "Shadowhunter",
          "ilvl": 1690,
          "last_updated": "3/30/2025, 9:03:24 PM"
        },
        {
          "name": "Syronlool",
          "class": "Wardancer",
          "ilvl": 1710,
          "last_updated": "3/30/2025, 9:06:07 PM"
        },
        {
          "name": "Syronwrizz",
          "class": "Slayer",
          "ilvl": 1610,
          "last_updated": "3/30/2025, 8:32:48 PM"
        },
        {
          "name": "Syronse",
          "class": "Souleater",
          "ilvl": 1640,
          "last_updated": "3/30/2025, 8:58:52 PM"
        },
        {
          "name": "Syrônlol",
          "class": "Paladin",
          "ilvl": 1680,
          "last_updated": "3/30/2025, 9:01:30 PM"
        },
        {
          "name": "Syronlul",
          "class": "Bard",
          "ilvl": 1692.5,
          "last_updated": "3/30/2025, 8:12:26 PM"
        },
        {
          "name": "Syrónlol",
          "class": "Sorceress",
          "ilvl": 1690,
          "last_updated": "3/30/2025, 9:06:41 PM"
        },
        {
          "name": "Syronlôl",
          "class": "Deathblade",
          "ilvl": 1692.5,
          "last_updated": "3/30/2025, 9:04:04 PM"
        }
      ]
    },
    {
      "mainCharacterName": "Siose",
      "characters": [
        {
          "name": "Siose",
          "class": "Bard",
          "ilvl": 1670.8334,
          "last_updated": "3/30/2025, 8:41:39 PM"
        },
        {
          "name": "Sioséé",
          "class": "Artist",
          "ilvl": 1640.8334,
          "last_updated": "3/30/2025, 8:01:23 PM"
        },
        {
          "name": "Siosê",
          "class": "Artist",
          "ilvl": 1678.3334,
          "last_updated": "3/30/2025, 8:22:57 PM"
        },
        {
          "name": "Siosè",
          "class": "Artist",
          "ilvl": 1670.1666,
          "last_updated": "3/30/2025, 8:37:23 PM"
        },
        {
          "name": "Siosé",
          "class": "Artist",
          "ilvl": 1705,
          "last_updated": "3/30/2025, 8:35:32 PM"
        },
        {
          "name": "Siosë",
          "class": "Artist",
          "ilvl": 1641.6666,
          "last_updated": "3/30/2025, 8:26:48 PM"
        },
        {
          "name": "Liosè",
          "class": "Glaivier",
          "ilvl": 1660,
          "last_updated": "3/30/2025, 8:46:41 PM"
        },
        {
          "name": "Liose",
          "class": "Glaivier",
          "ilvl": 1699.1666,
          "last_updated": "3/30/2025, 8:15:26 PM"
        }
      ]
    }
  ]

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRosters().pipe(first()).subscribe((data) => {
      console.log('where my datyaatastkaosokadsopkasd', data)
    })
  }
}
