'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CHAT_SUGGESTIONS } from '@/lib/knowledge';

export type ConsoleMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ConsoleContextValue = {
  messages: ConsoleMessage[];
  loading: boolean;
  mode: string;
  latencyMs: number | null;
  suggestions: string[];
  history: string[];
  send: (text: string) => Promise<void>;
  clear: () => void;
};

const ConsoleContext = createContext<ConsoleContextValue | null>(null);

function createId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const WELCOME: ConsoleMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Console live — ask anything about Akhil. Natural language works. Shortcuts: help · whoami · wins · paypal · stack · contact · clear. Arrow-up recalls the last query.',
};

function followUpsFor(query: string): string[] {
  const text = query.toLowerCase();
  if (text.includes('paypal') || text.includes('role')) {
    return ['What did he do at Oracle?', 'Would he fit a staff platform role?', 'What is his tech stack?'];
  }
  if (text.includes('smartwealth') || text.includes('invest')) {
    return ['What was his role on SmartWealth?', 'Any other hackathon wins?', 'How can I contact him?'];
  }
  if (text.includes('cursor') || text.includes('win')) {
    return ['Walk me through SmartWealth', 'What is his tech stack?', 'Open to work?'];
  }
  if (text.includes('stack') || text.includes('skill')) {
    return ['What does Akhil do at PayPal?', 'Would he fit a staff platform role?'];
  }
  if (text.includes('contact') || text.includes('email')) {
    return ['What does Akhil do at PayPal?', 'Any hackathon wins?'];
  }
  return CHAT_SUGGESTIONS.slice(0, 3);
}

export function ConsoleProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ConsoleMessage[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('idle');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(CHAT_SUGGESTIONS);
  const [history, setHistory] = useState<string[]>([]);

  const clear = useCallback(() => {
    setMessages([WELCOME]);
    setMode('idle');
    setLatencyMs(null);
    setSuggestions(CHAT_SUGGESTIONS);
  }, []);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const lower = trimmed.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      clear();
      return;
    }

    const userMessage: ConsoleMessage = { id: createId(), role: 'user', content: trimmed };
    const assistantId = createId();

    setHistory((current) => [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 40));
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: 'assistant', content: '' },
    ]);
    setLoading(true);
    setSuggestions(followUpsFor(trimmed));
    const started = performance.now();

    if (lower === 'help') {
      const help =
        'Ask in plain English, or run: whoami · wins · paypal · stack · smartwealth · cursor · contact · clear\nExamples: "Would he fit a staff platform role?" · "Walk me through SmartWealth"';
      setMessages((current) =>
        current.map((item) => (item.id === assistantId ? { ...item, content: help } : item)),
      );
      setMode('command');
      setLatencyMs(Math.round(performance.now() - started));
      setLoading(false);
      return;
    }

    try {
      const payload = [...messages, userMessage]
        .filter((item) => item.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      if (!response.ok || !response.body) {
        throw new Error('uplink');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assembled = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() ?? '';

        for (const chunk of chunks) {
          const line = chunk.trim();
          if (!line.startsWith('data:')) continue;
          try {
            const json = JSON.parse(line.slice(5).trim()) as {
              delta?: string;
              mode?: string;
              done?: boolean;
            };
            if (json.mode) setMode(json.mode);
            if (json.delta) {
              assembled += json.delta;
              const snapshot = assembled;
              setMessages((current) =>
                current.map((item) =>
                  item.id === assistantId ? { ...item, content: snapshot } : item,
                ),
              );
            }
          } catch {
            // skip a partial SSE frame
          }
        }
      }

      if (!assembled.trim()) {
        throw new Error('empty');
      }
    } catch {
      setMode('local');
      setMessages((current) =>
        current.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                content: 'Uplink dropped. Retry, or type help / contact.',
              }
            : item,
        ),
      );
    } finally {
      setLatencyMs(Math.round(performance.now() - started));
      setLoading(false);
    }
  }, [clear, loading, messages]);

  const value = useMemo(
    () => ({ messages, loading, mode, latencyMs, suggestions, history, send, clear }),
    [messages, loading, mode, latencyMs, suggestions, history, send, clear],
  );

  return <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>;
}

export function useConsole() {
  const value = useContext(ConsoleContext);
  if (!value) {
    throw new Error('useConsole must be used inside ConsoleProvider');
  }
  return value;
}
