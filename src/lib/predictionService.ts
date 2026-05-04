export interface PredictionRecord {
  id: string;
  market: string;
  eventLabel: string;
  modelProbability: number;
  marketOdds: number;
  startsAt: string;
}

const mockPredictionRows: PredictionRecord[] = [
  {
    id: 'pred_001',
    market: 'MLB Moneyline',
    eventLabel: 'Yankees @ Red Sox',
    modelProbability: 0.53,
    marketOdds: 2.1,
    startsAt: '2026-05-04T23:10:00.000Z',
  },
  {
    id: 'pred_002',
    market: 'MLB Moneyline',
    eventLabel: 'Dodgers @ Giants',
    modelProbability: 0.57,
    marketOdds: 1.95,
    startsAt: '2026-05-05T01:45:00.000Z',
  },
  {
    id: 'pred_003',
    market: 'MLB Moneyline',
    eventLabel: 'Mets @ Braves',
    modelProbability: 0.47,
    marketOdds: 2.4,
    startsAt: '2026-05-05T00:20:00.000Z',
  },
  {
    id: 'pred_004',
    market: 'MLB Moneyline',
    eventLabel: 'Cubs @ Cardinals',
    modelProbability: 0.52,
    marketOdds: 2.05,
    startsAt: '2026-05-05T02:15:00.000Z',
  },
];

const NETWORK_DELAY_MS = 240;

export async function fetchMockPredictions(): Promise<PredictionRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
  return mockPredictionRows;
}
