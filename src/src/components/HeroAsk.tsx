'use client';

import { useState } from 'react';
import { useConsole } from '@/components/ConsoleProvider';

const PROMPTS = [
  'What does Akhil do at PayPal?',
  'Would he fit a staff platform role?',
  'Walk me through SmartWealth',
];

export function HeroAsk() {
  const { send, loading, openDock } = useConsole();
  const [value, setValue] = useState('');

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setValue('');
    openDock();
    document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    void send(trimmed);
  };

  return (
    <div className="hero-ask-wrap">
      <form
        className="hero-ask"
        onSubmit={(event) => {
          event.preventDefault();
          ask(value);
        }}
      >
        <span className="hero-ask-live" aria-hidden>
          <span className="pulse-dot" />
          LIVE
        </span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="hero-ask-input"
          placeholder="Ask Akhil anything — PayPal, SmartWealth, stack, fit…"
          autoComplete="off"
          disabled={loading}
          aria-label="Ask Akhil"
        />
        <button type="submit" className="hero-ask-submit" disabled={loading || !value.trim()}>
          Ask
        </button>
      </form>
      <div className="hero-ask-prompts">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="console-chip"
            onClick={() => ask(prompt)}
            disabled={loading}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
