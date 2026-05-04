import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateKelly } from '../../hooks/useKelly';
import type { Match } from '../../lib/mockData';
import { EdgeIndicator } from '../features/EdgeIndicator';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface EdgeCardProps {
  match: Match;
}

export function EdgeCard({ match }: EdgeCardProps) {
  const queryClient = useQueryClient();
  const kelly = calculateKelly({ probability: match.probability, odds: match.odds });

  const mutation = useMutation({
    mutationFn: async () => ({ matchId: match.id, stake: kelly.fraction }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bets'] });
      const previous = queryClient.getQueryData<Array<{ matchId: string; stake: number }>>(['bets']) ?? [];
      queryClient.setQueryData(['bets'], [...previous, { matchId: match.id, stake: kelly.fraction }]);
      return { previous };
    },
    onError: (_error, _vars, context) => {
      queryClient.setQueryData(['bets'], context?.previous ?? []);
    },
  });

  return (
    <Card title={`${match.awayTeam} @ ${match.homeTeam}`}>
      <p className="text-sm text-slate-300">Market odds: {match.odds.toFixed(2)}</p>
      <p className="text-sm text-slate-300">Model win probability: {(match.probability * 100).toFixed(1)}%</p>
      <div className="my-2">
        <EdgeIndicator edge={kelly.edge} />
      </div>
      <Button onClick={() => mutation.mutate()} aria-label={`Log bet for ${match.awayTeam} at ${match.homeTeam}`}>
        Log Bet
      </Button>
    </Card>
  );
}
