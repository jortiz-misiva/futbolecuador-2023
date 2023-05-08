import { createClient } from 'redis';

type CacheValue = Record<string, unknown> | string | boolean | number | any;

const client = createClient();

const connectIfNecessary = async (): Promise<void> => {
  if (client.isReady) return;
  if (client.isOpen) return;
  await client.connect();
};

const set = async (
  key: string,
  value: CacheValue,
  options: { expirationS?: number } = {}
): Promise<void> => {
  if (
    (process.env.DEV && process.env.ENABLED_REDIS == 'false') ||
    process.env.BASE_URL?.includes('dev.')
  )
    return;
  await connectIfNecessary();

  const valueToStore = typeof value == 'string' ? value : JSON.stringify(value);
  await client.set(key, valueToStore, {
    EX: options.expirationS,
  });
};

const get = async (key: string): Promise<CacheValue | null> => {
  if (
    (process.env.DEV && process.env.ENABLED_REDIS == 'false') ||
    process.env.BASE_URL?.includes('dev.')
  )
    return null;
  await connectIfNecessary();
  const value = await client.get(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export default { set, get };
