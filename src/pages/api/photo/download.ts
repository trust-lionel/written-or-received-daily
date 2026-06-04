// src/pages/api/photo/download.ts
// Triggers the Unsplash download endpoint as required by API guidelines.
// Must be called whenever a photo is displayed to a user.
// https://unsplash.com/documentation#trigger-a-download
export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const downloadUrl = url.searchParams.get('url');
  const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;

  if (!downloadUrl || !accessKey) {
    return new Response(null, { status: 204 });
  }

  try {
    await fetch(decodeURIComponent(downloadUrl), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        'Accept-Version': 'v1',
      },
    });
  } catch {
    // Non-critical — silent fail
  }

  return new Response(null, { status: 204 });
};
