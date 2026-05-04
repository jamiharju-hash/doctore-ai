import { Badge } from '../ui/badge';

interface EdgeIndicatorProps {
  edge: number;
}

export function EdgeIndicator({ edge }: EdgeIndicatorProps) {
  const isStrong = edge > 0.025;

  return (
    <div className={isStrong ? 'animate-pulse' : ''}>
      <Badge tone={isStrong ? 'success' : 'neutral'}>{(edge * 100).toFixed(2)}% edge</Badge>
      {isStrong ? <span className="sr-only">Strong edge detected</span> : null}
    </div>
  );
}
