'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
  value: string;
  className?: string;
};

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-fog transition hover:border-iris/50',
        className,
      )}
    >
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}
