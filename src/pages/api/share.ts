// src/pages/api/share.ts
// Netlify serverless function — stores a postcard in Netlify Blobs
// and returns a unique shareable ID.

import type { APIRoute } from 'astro';
import { nanoid } from 'nanoid';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, from, occasion, collection, playing, img } = body;

    // Validate required field
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Message is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Enforce 280-character limit
    if (message.length > 280) {
      return new Response(JSON.stringify({ error: 'Message exceeds 280 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = nanoid(8);

    // Attempt Blobs storage — gracefully degrade if unavailable
    let stored = false;
    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore({ name: 'postcards', consistency: 'strong' });
      await store.setJSON(id, {
        id,
        message: message.trim(),
        from: from?.trim() || null,
        occasion: occasion || null,
        collection: collection || 'Jazz & Music',
        playing: playing?.trim() || null,
        img: img || null,
        createdAt: new Date().toISOString(),
      });
      stored = true;
    } catch (blobErr) {
      // Log but do not fail — return the link anyway
      console.error('Blobs storage error:', blobErr instanceof Error ? blobErr.message : String(blobErr));
    }

    console.log(`Share created: id=${id} stored=${stored}`);

    return new Response(
      JSON.stringify({
        id,
        url: `https://wordcards.co/p/${id}`,
        stored,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Share API error:', err instanceof Error ? err.message : String(err));
    return new Response(
      JSON.stringify({
        error: 'Something went wrong. Please try again.',
        detail: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
