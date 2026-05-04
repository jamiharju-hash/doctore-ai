import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Toast } from '../ui/Toast';

export function ApiKeyManager() {
  const [apiKey, setApiKey] = useState('pk_live_************************');
  const [message, setMessage] = useState('');

  const rotateKey = () => {
    setApiKey(`pk_live_${Math.random().toString(36).slice(2, 18)}`);
    setMessage('API key rotated successfully.');
  };

  return (
    <Card title="API Key Manager">
      <p className="mb-2 text-sm text-slate-300">Current key: <code>{apiKey}</code></p>
      <Button onClick={rotateKey}>Rotate API Key</Button>
      {message ? <div className="mt-3"><Toast message={message} /></div> : null}
    </Card>
  );
}
