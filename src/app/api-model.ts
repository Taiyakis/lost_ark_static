export interface ApiResponse {
    mainCharacterName: string,
    characters: Character[]
}

export interface Character {
    name: string,
    class: string,
    ilvl: number,
    last_updated: string
}
