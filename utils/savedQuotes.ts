import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVED_QUOTES_KEY = 'psylens_saved_quotes';

export type SavedQuote = {
  authorId: string;
  authorName: string;
  quote: string;
  dateAdded: string; // ISO YYYY-MM-DD
};

export async function getSavedQuotes(): Promise<SavedQuote[]> {
  const raw = await AsyncStorage.getItem(SAVED_QUOTES_KEY).catch(() => null);
  return raw ? JSON.parse(raw) : [];
}

export function isQuoteSaved(saved: SavedQuote[], authorId: string, quote: string): boolean {
  return saved.some(e => e.authorId === authorId && e.quote === quote);
}

// One-directional: no-op if this exact quote was already saved for this author.
export async function saveQuote(entry: { authorId: string; authorName: string; quote: string }): Promise<SavedQuote[]> {
  const existing = await getSavedQuotes();
  if (isQuoteSaved(existing, entry.authorId, entry.quote)) return existing;
  const updated: SavedQuote[] = [
    ...existing,
    { ...entry, dateAdded: new Date().toISOString().slice(0, 10) },
  ];
  await AsyncStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(updated)).catch(() => {});
  return updated;
}
