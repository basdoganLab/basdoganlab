export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  doi?: string;
  url?: string;
  pdf?: string;
  highlight?: boolean;
}

interface BibEntry {
  type: string;
  citationKey: string;
  fields: Record<string, string>;
}

export const parseBibTeX = (input: string): Publication[] =>
  extractEntries(input)
    .map(parseEntry)
    .map(toPublication)
    .filter((publication): publication is Publication => publication !== null);

const extractEntries = (input: string): string[] => {
  const entries: string[] = [];
  let index = 0;

  while (index < input.length) {
    const atIndex = input.indexOf('@', index);
    if (atIndex === -1) break;

    let cursor = atIndex + 1;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor++;
    while (cursor < input.length && /[a-z]/i.test(input[cursor])) cursor++;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor++;

    const opening = input[cursor];
    if (opening !== '{' && opening !== '(') {
      index = cursor + 1;
      continue;
    }

    const closing = opening === '{' ? '}' : ')';
    let depth = 0;
    let inQuotes = false;
    let escaped = false;
    let end = cursor;

    for (; end < input.length; end++) {
      const char = input[end];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (inQuotes) continue;

      if (char === opening) depth++;
      if (char === closing) {
        depth--;
        if (depth === 0) {
          entries.push(input.slice(atIndex, end + 1));
          break;
        }
      }
    }

    index = end + 1;
  }

  return entries;
};

const parseEntry = (entry: string): BibEntry | null => {
  const match = entry.match(/^@(\w+)\s*[{(]([\s\S]*)[})]\s*$/);
  if (!match) return null;

  const [, type, body] = match;
  const separatorIndex = body.indexOf(',');
  if (separatorIndex === -1) return null;

  const citationKey = body.slice(0, separatorIndex).trim();
  const fieldsBlock = body.slice(separatorIndex + 1);

  return {
    type: type.toLowerCase(),
    citationKey,
    fields: parseFields(fieldsBlock),
  };
};

const parseFields = (input: string): Record<string, string> => {
  const fields: Record<string, string> = {};
  let index = 0;

  while (index < input.length) {
    while (index < input.length && /[\s,]/.test(input[index])) index++;
    if (index >= input.length) break;

    const keyMatch = input.slice(index).match(/^([a-zA-Z][\w-]*)\s*=/);
    if (!keyMatch) break;

    const key = keyMatch[1].toLowerCase();
    index += keyMatch[0].length;

    while (index < input.length && /\s/.test(input[index])) index++;
    const { value, nextIndex } = readValue(input, index);
    fields[key] = normalizeFieldValue(value);
    index = nextIndex;
  }

  return fields;
};

const readValue = (input: string, start: number): { value: string; nextIndex: number } => {
  const opener = input[start];

  if (opener === '{') {
    let depth = 0;
    let index = start;

    for (; index < input.length; index++) {
      const char = input[index];
      if (char === '{') depth++;
      if (char === '}') {
        depth--;
        if (depth === 0) {
          return { value: input.slice(start + 1, index), nextIndex: index + 1 };
        }
      }
    }
  }

  if (opener === '"') {
    let index = start + 1;
    let escaped = false;

    for (; index < input.length; index++) {
      const char = input[index];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === '"') {
        return { value: input.slice(start + 1, index), nextIndex: index + 1 };
      }
    }
  }

  let end = start;
  while (end < input.length && input[end] !== ',') end++;
  return { value: input.slice(start, end), nextIndex: end };
};

const normalizeFieldValue = (value: string): string =>
  value
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[{}]/g, '')
    .trim();

const toPublication = (entry: BibEntry | null): Publication | null => {
  if (!entry) return null;

  const fields = entry.fields;
  const title = fields.title;
  const authors = parseAuthors(fields.author);
  const year = Number.parseInt(fields.year ?? '', 10);
  const venue = fields.journal ?? fields.booktitle ?? fields.publisher ?? fields.school ?? fields.howpublished;

  if (!title || authors.length === 0 || !venue || Number.isNaN(year)) return null;

  const doi = normalizeDoi(fields.doi);
  const url = fields.url;
  const pdf = fields.pdf;
  const abstract = fields.abstract;
  const highlight = parseHighlight(fields);

  return {
    title,
    authors,
    venue,
    year,
    ...(abstract ? { abstract } : {}),
    ...(doi ? { doi } : {}),
    ...(url ? { url } : {}),
    ...(pdf ? { pdf } : {}),
    ...(highlight ? { highlight } : {}),
  };
};

const parseAuthors = (authorField?: string): string[] => {
  if (!authorField) return [];

  return authorField
    .split(/\s+and\s+/i)
    .map((author) => author.trim())
    .filter(Boolean)
    .map(formatAuthorName);
};

const formatAuthorName = (author: string): string => {
  if (!author.includes(',')) return author;

  const parts = author
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) return author;
  return `${parts.slice(1).join(' ')} ${parts[0]}`.trim();
};

const normalizeDoi = (doi?: string): string | undefined => {
  if (!doi) return undefined;
  return doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim();
};

const parseHighlight = (fields: Record<string, string>): boolean | undefined => {
  const candidates = [fields.highlight, fields.featured, fields.note, fields.keywords];
  const combined = candidates.filter(Boolean).join(' ').toLowerCase();
  return combined.includes('highlight') || combined.includes('featured') ? true : undefined;
};
