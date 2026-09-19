import { BOOKS_COLLECTION } from './books';

export interface StoryChapter {
  number: number;
  title: string;
  duration?: string;
  text: string[];
}

export const DEFAULT_PRICE_FCFA = 2500;

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  universeLabel?: string;
  author?: string;
  episodesCount?: number;
  price?: number;
  priceFcfa?: number;
  chapters: StoryChapter[];
  fullChapters?: StoryChapter[];
}

export const STORIES: Story[] = BOOKS_COLLECTION.map((b) => ({
  id: b.id,
  title: b.title,
  subtitle: b.subtitle,
  universeLabel: b.badgeLabel,
  author: 'Encre & Ombre',
  episodesCount: b.chapters.length,
  price: b.priceFcfa,
  priceFcfa: b.priceFcfa,
  chapters: b.chapters.map((c) => ({
    number: c.number,
    title: c.title,
    duration: '5 min',
    text: c.content,
  })),
  fullChapters: b.chapters.map((c) => ({
    number: c.number,
    title: c.title,
    duration: '5 min',
    text: c.content,
  })),
}));
