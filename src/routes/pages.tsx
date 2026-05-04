import { useState } from 'react';
import { calculateKelly } from '../hooks/useKelly';
import { ApiKeyManager } from '../components/b2b/ApiKeyManager';
import { CodeBlock } from '../components/b2b/CodeBlock';
import { EdgeFeed } from '../components/edge/EdgeFeed';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export function LandingRoute() {
  const [probability, setProbability] = useState('0.54');
  const [odds, setOdds] = useState('2.1');
  const kelly = calculateKelly({ probability: Number(probability), odds: Number(odds) });

  return (
    <main>
      <section aria-label="Interactive odds calculator hero" className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-100">Find high-edge bets faster</h1>
        <Input id="probability" label="Win Probability" value={probability} onChange={(e) => setProbability(e.target.value)} />
        <Input id="odds" label="Decimal Odds" value={odds} onChange={(e) => setOdds(e.target.value)} />
        <p className="text-slate-300">Suggested stake: {(kelly.fraction * 100).toFixed(2)}% of bankroll</p>
      </section>
    </main>
  );
}

export function SignupRoute() {
  return <Card title="Signup">Create your account to start edge tracking.</Card>;
}

export function OnboardingRoute() {
  return (
    <Card title="Onboarding - Bankroll Setup">
      <Input id="bankroll" label="Starting Bankroll" type="number" min={0} />
      <div className="mt-3"><Button>Continue to Dashboard</Button></div>
    </Card>
  );
}

export function DashboardRoute() {
  return (
    <section aria-label="Dashboard" className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Today\'s Edge Feed</h2>
      <EdgeFeed />
    </section>
  );
}

export function ApiDashboardRoute() {
  return (
    <section aria-label="B2B API dashboard" className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Partner API Portal</h2>
      <ApiKeyManager />
      <Card title="Partner API examples">
        <CodeBlock code={`curl -H "Authorization: Bearer $API_KEY" https://api.doctore.ai/v1/edges?league=MLB`} />
      </Card>
    </section>
  );
}
