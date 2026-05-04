import { useQuery } from '@tanstack/react-query';
import { mockMlbMatches } from '../../lib/mockData';
import { EdgeCard } from './EdgeCard';

export function EdgeFeed() {
  const { data } = useQuery({
    queryKey: ['matches', 'mlb'],
    queryFn: async () => mockMlbMatches,
    initialData: mockMlbMatches,
  });

  return (
    <section aria-label="Edge feed" className="grid gap-4 md:grid-cols-2">
      {data.map((match) => (
        <EdgeCard key={match.id} match={match} />
      ))}
    </section>
  );
}
