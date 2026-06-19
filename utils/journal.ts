import AsyncStorage from '@react-native-async-storage/async-storage';

export const JOURNAL_PREFIX = 'psylens_journal_';

export type JournalEntry = {
  authorId: string;
  authorName: string;
  question: string;
  answer: string;
  date: string; // ISO YYYY-MM-DD
};

export async function getJournalEntries(authorId: string): Promise<JournalEntry[]> {
  const raw = await AsyncStorage.getItem(JOURNAL_PREFIX + authorId).catch(() => null);
  return raw ? JSON.parse(raw) : [];
}

// Reflections always accumulate as new dated entries — never overwrite,
// since the value is in seeing how perspective changes over time.
export async function appendJournalEntry(entry: JournalEntry): Promise<JournalEntry[]> {
  const existing = await getJournalEntries(entry.authorId);
  const updated = [...existing, entry];
  await AsyncStorage.setItem(JOURNAL_PREFIX + entry.authorId, JSON.stringify(updated)).catch(() => {});
  return updated;
}
