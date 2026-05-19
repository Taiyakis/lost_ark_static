export interface ApiResponse {
    RosterName: string,
    CharacterName: string,
    ClassName: string,
    Level: number,
    Score: number,
    IsSupport: boolean
}

export interface HistoryResponse {
    FilterType: string,
    CharacterName: string,
    Level: number
}

export interface IConfig {
    api: {
        staticId: number,
        endPoint: string
    }
    raids: {
        hideRaid?: boolean,
        name: string,
        raidLevelRequirement: number,
        values: {
            dps: number,
            supp: number,
            dpsNames: string[],
            suppNames: string[]
        }[]
    }[]
}

declare global {
    interface Window {
        APP_CONFIG: IConfig
    }
}