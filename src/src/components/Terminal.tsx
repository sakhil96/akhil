'use client';

import { useMemo, useRef, useState } from 'react';
import { site } from '@/lib/site';

type TerminalEntry = {
  command: string;
  output: string[];
};

export function Terminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commandMap = useMemo(() => {
    return new Map(site.terminal.commands.map((cmd) => [cmd.command, cmd]));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return;

    const normalizedCommand = trimmed === 'aiadapt' ? 'smartwealth' : trimmed;
    const command = commandMap.get(normalizedCommand);
    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: command
          ? command.output
          : ['Unknown command. Type `help` to see what is available.'],
      },
    ]);
    setValue('');
  };

  return (
    <div
      className="terminal font-mono"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: 'var(--success)' }} />
        <span className="terminal-dot" style={{ background: 'var(--warning)' }} />
        <span className="terminal-dot" style={{ background: 'var(--accent)' }} />
        <span>Inference terminal</span>
      </div>

      <div className="terminal-body">
        <div className="text-muted">
          Type <span className="text-accent">help</span> to explore the control room.
        </div>

        <div className="terminal-history">
          {history.map((entry, index) => (
            <div key={`${entry.command}-${index}`} className="stack-sm">
              <div className="terminal-command">
                <span className="text-accent">{site.terminal.prompt}</span> $
                <span> {entry.command}</span>
              </div>
              <div className="terminal-output">
                {entry.output.map((line, lineIndex) => (
                  <div key={`${entry.command}-${lineIndex}`}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="terminal-form">
          <span className="text-accent">{site.terminal.prompt}</span>
          <span>$</span>
          <label className="sr-only" htmlFor="terminal-input">
            Terminal input
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="terminal-input"
            placeholder="Type a command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
