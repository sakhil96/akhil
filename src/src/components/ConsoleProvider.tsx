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
    'Ask about PayPal, Project Seal, the hackathons, the Java/AWS work, or whether the background fits a role.',
};

function followUpsFor(query: string): string[] {
  const text = query.toLowerCase();
  if (text.includes('paypal') || text.includes('role')) {
    return ['How does he think about model safety?', 'Would he fit a staff platform role?', 'What is his stack?'];
  }
  if (text.includes('seal') || text.includes('safety') || text.includes('red')) {
    return ['What are agentic workflows he has built?', 'What does he do at PayPal?', 'How can I contact him?'];
  }
  if (text.includes('smartwealth') || text.includes('invest')) {
    return ['What was his role on SmartWealth?', 'Any other hackathon work?', 'How can I contact him?'];
  }
  if (text.includes('upgrad') || text.includes('student') || text.includes('microsoft')) {
    return ['What is ProductGravity?', 'Would he fit a staff platform role?', 'What is Project Seal?'];
  }
  if (text.includes('cursor') || text.includes('win')) {
    return ['Walk me through SmartWealth', 'What is his stack?', 'How can I contact him?'];
  }
  if (text.includes('stack') || text.includes('skill') || text.includes('java') || text.includes('aws')) {
    return ['What does he do at PayPal?', 'Would he fit a staff ML / platform role?'];
  }
  if (text.includes('contact') || text.includes('email')) {
    return ['What does he do at PayPal?', 'What is Project Seal?'];
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

  const send = useCallback(
    async (text: string) => {
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
                  content: 'Could not reach the live answer path. Try again, or email him directly.',
                }
              : item,
          ),
        );
      } finally {
        setLatencyMs(Math.round(performance.now() - started));
        setLoading(false);
      }
    },
    [clear, loading, messages],
  );

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
