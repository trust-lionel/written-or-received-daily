// src/pages/api/share.ts
// Netlify serverless function — stores a postcard in Netlify Blobs
// and returns a unique shareable ID.
//
// POST /api/share
// Body: { message, from, occasion, collection, playing, img }
// Returns: { id, url }

import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';
import { nanoid } from 'nanoid';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    // 'from' field contains name and location e.g. 'Sarah — Chicago, IL'
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

    // Generate a short unique ID for the shareable link
    const id = nanoid(8);

    // Store postcard data in Netlify Blobs
    const store = getStore('postcards');
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

    return new Response(
      JSON.stringify({
        id,
        url: `https://wordcards.co/p/${id}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Share API error:', err);

    // Detect Netlify Blobs context error — occurs when site is not yet
    // connected to its custom domain or Blobs runtime is not initialized.
    const errMsg = err instanceof Error ? err.message : String(err);
    const isContextError =
      errMsg.includes('context') ||
      errMsg.includes('NETLIFY_BLOBS') ||
      errMsg.includes('store') ||
      errMsg.includes('environment');

    const userMessage = isContextError
      ? 'Sharing will be available once wordcards.co is fully connected. Check back shortly.'
      : 'Something went wrong. Please try again.';

    return new Response(JSON.stringify({ error: userMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
