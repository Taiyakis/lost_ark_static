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