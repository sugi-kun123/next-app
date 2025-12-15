// src/types/team.ts
export interface SeasonStats {
  year: number;
  category: string;
  rank: number;
  win: number;
  draw: number;
  loss: number;
}

export interface Team {
  id: string;
  name: string;
  hometown: string;
  color: string;
  logo: string;
  since: number;
  stats: SeasonStats[];
}
