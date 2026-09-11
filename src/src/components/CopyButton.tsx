'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';

type CopyButtonProps = {
  value: string;
};

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button variant="ghost" onClick={handleCopy}>
      {copied ? 'Copied' : 'Copy email'}
    </Button>
  );
}
