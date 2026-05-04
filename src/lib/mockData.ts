export interface Match {
  id: string;
  league: 'MLB';
  homeTeam: string;
  awayTeam: string;
  odds: number;
  probability: number;
}

export const mockMlbMatches: Match[] = [
  { id: '1', league: 'MLB', awayTeam: 'Yankees', homeTeam: 'Red Sox', odds: 2.1, probability: 0.53 },
  { id: '2', league: 'MLB', awayTeam: 'Dodgers', homeTeam: 'Giants', odds: 1.95, probability: 0.57 },
  { id: '3', league: 'MLB', awayTeam: 'Astros', homeTeam: 'Mariners', odds: 2.25, probability: 0.49 },
  { id: '4', league: 'MLB', awayTeam: 'Mets', homeTeam: 'Braves', odds: 2.4, probability: 0.47 },
  { id: '5', league: 'MLB', awayTeam: 'Cubs', homeTeam: 'Cardinals', odds: 2.05, probability: 0.52 },
];
