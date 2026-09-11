import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { genesisState, type ChainState } from './chain';

function dataPath() {
  if (process.env.NEXORA_DATA_PATH) return process.env.NEXORA_DATA_PATH;
  if (process.env.VERCEL) return '/tmp/nexora-chain.json';
  return path.join(process.cwd(), 'data', 'nexora-chain.json');
}

let cache: ChainState | null = null;
let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<ChainState> {
  if (cache) return cache;
  try {
    const raw = await readFile(dataPath(), 'utf8');
    cache = JSON.parse(raw) as ChainState;
    return cache;
  } catch {
    cache = genesisState();
    await persist(cache);
    return cache;
  }
}

async function persist(state: ChainState) {
  const file = dataPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(state, null, 2));
  cache = state;
}

export async function withChain<T>(mutate: (state: ChainState) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const state = await load();
    const result = await mutate(state);
    await persist(state);
    return result;
  });
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function readChain(): Promise<ChainState> {
  const run = queue.then(() => load());
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}
