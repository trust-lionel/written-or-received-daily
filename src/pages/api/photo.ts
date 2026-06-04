// src/pages/api/photo.ts
// Returns a random Unsplash photo for a given collection.
// Called client-side when a postcard is drawn or a collection is selected.
// prerender = false — server-rendered Netlify function.
export const prerender = false;

import type { APIRoute } from 'astro';
import { getUnsplashPhoto } from '../../lib/unsplash';

export const GET: APIRoute = async ({ url }) => {
  const collection = url.searchParams.get('collection') ?? 'Nature & Stillness';
  const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return new Response(JSON.stringify({ error: 'Unsplash not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const photo = await getUnsplashPhoto(collection, accessKey);

  if (!photo) {
    return new Response(JSON.stringify({ error: 'No photo found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(photo), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store', // always fresh
    },
  });
};
