import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <Badge tone="success">Step 1 Complete</Badge>
        <h1 className="text-3xl font-semibold">Doctore AI Starter</h1>
      </header>
      <Card>
        <form className="space-y-4" aria-label="Demo form">
          <label htmlFor="market" className="block text-sm font-medium text-slate-300">
            Market Input
          </label>
          <Input id="market" name="market" aria-label="Market input" placeholder="Enter odds or match details" />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  );
}
