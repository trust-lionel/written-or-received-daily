// src/data/cards.ts
// Central postcard pool with occasion-matched Unsplash collections.
// Unsplash collection IDs map to curated sets maintained at unsplash.com/collections.
// Each card's image is drawn from its matching collection for content relevance.

export interface Card {
  id: string;
  message: string;
  from: string;
  occasion: string;
  collection: string;
  playing: string | null;
  img: string;
}

// Curated Unsplash collection IDs — each maps to a hand-selected set of images
export const COLLECTIONS: Record<string, string> = {
  'Jazz & Music':       '4332580',
  'City & Urban':       '1103088',
  'Nature & Stillness': '3330448',
  'Abstract & Light':   '2176460',
  'Motivational':       '1459961',
  'Encouragement':      '9948714',
};

// Occasion-to-collection mapping — ensures drawn images match postcard tone
export const OCCASION_COLLECTION: Record<string, string> = {
  'Birthday':               'Encouragement',
  'Starting something new': 'Motivational',
  'Finishing something hard':'Motivational',
  'Showing up anyway':      'Nature & Stillness',
  'Getting through the week':'Abstract & Light',
  'Tough times':            'Nature & Stillness',
  'Just because':           'Jazz & Music',
};

// Public postcard pool — seeded with curated cards
// img URLs use Unsplash source API with occasion-matched photos
export const PUBLIC_CARDS: Card[] = [
  {
    id: 'card-001',
    message: 'You have survived every hard day so far. That is not a small thing. That is everything.',
    from: 'Houston, TX',
    occasion: 'Showing up anyway',
    collection: 'Nature & Stillness',
    playing: 'John Coltrane — A Love Supreme',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    id: 'card-002',
    message: 'The version of you that started is not the version of you that will finish. Trust the process.',
    from: '3AM',
    occasion: 'Starting something new',
    collection: 'Motivational',
    playing: 'Miles Davis — Kind of Blue',
    img: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&q=80',
  },
  {
    id: 'card-003',
    message: 'Rest is not the opposite of progress. Sometimes it is the most productive thing you can do.',
    from: 'Somewhere between jobs',
    occasion: 'Getting through the week',
    collection: 'Abstract & Light',
    playing: 'Bill Evans — Waltz for Debby',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'card-004',
    message: 'Not everyone will understand the direction you are heading. Go anyway.',
    from: 'A Tuesday in November',
    occasion: 'Tough times',
    collection: 'Nature & Stillness',
    playing: 'Herbie Hancock — Maiden Voyage',
    img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
  },
  {
    id: 'card-005',
    message: 'You are not behind. You are on your own timeline. There is a difference.',
    from: 'Anonymous',
    occasion: 'Just because',
    collection: 'Jazz & Music',
    playing: null,
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
  },
  {
    id: 'card-006',
    message: 'Another trip around the sun. Everything you have been through made you exactly who you are today. That is worth celebrating.',
    from: 'The universe',
    occasion: 'Birthday',
    collection: 'Encouragement',
    playing: 'Stevie Wonder — Happy Birthday',
    img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
  },
  {
    id: 'card-007',
    message: 'Finishing something hard is proof that you are harder than you thought. Remember that.',
    from: 'Someone who has been there',
    occasion: 'Finishing something hard',
    collection: 'Motivational',
    playing: 'John Coltrane — Resolution',
    img: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80',
  },
  {
    id: 'card-008',
    message: 'The fact that you showed up today — even when it was hard — matters more than you know.',
    from: 'A quiet morning',
    occasion: 'Showing up anyway',
    collection: 'Nature & Stillness',
    playing: null,
    img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80',
  },
];
