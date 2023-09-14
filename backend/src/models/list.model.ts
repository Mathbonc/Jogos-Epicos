  enum EntryType {
    PLAYED = 'played',
    WISHLIST = 'wished',
    ABANDONED = 'abandoned'
  }
  
  type ListEntry = {
    entryId: number;
    gameId: number;
    entryType: string;
    date: Date;
  }
  
  type GameList = {
    userId: number;
    entries: ListEntry[];
  }

export { EntryType, ListEntry, GameList };