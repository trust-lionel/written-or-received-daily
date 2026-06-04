// src/lib/unsplash.ts
// Unsplash API integration for W.O.R.D. — Written Or Received Daily
// Uses search endpoint with curated keywords per collection
// Complies with Unsplash API guidelines:
//   - Hotlinks to original Unsplash URLs
//   - Triggers download endpoint on image use
//   - Attributes photographer and Unsplash

export interface UnsplashPhoto {
  id: string;
  url: string;
  downloadUrl: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  unsplashUrl: string;
}

// Search queries per collection — curated for people-free, high quality results
const COLLECTION_QUERIES: Record<string, string> = {
  'Jazz & Music':        'jazz vinyl record music instrument',
  'City & Urban':        'city architecture skyline urban night',
  'Nature & Stillness':  'nature landscape mountains lake forest',
  'Abstract & Light':    'abstract light texture bokeh colorful',
  'Motivational':        'sunrise horizon open road dawn sky',
  'Encouragement':       'flowers bloom warm light hope sunrise',
};

// Orientation filter — landscape works best for the postcard image area
const ORIENTATION = 'landscape';

// Content filter — high filters out adult content
const CONTENT_FILTER = 'high';

/**
 * Fetch a random people-free photo from Unsplash for a given collection
 */
export async function getUnsplashPhoto(
  collection: string,
  accessKey: string
): Promise<UnsplashPhoto | null> {
  const query = COLLECTION_QUERIES[collection] ?? 'nature landscape';
  const page = Math.floor(Math.random() * 5) + 1; // randomize across first 5 pages

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=${ORIENTATION}&content_filter=${CONTENT_FILTER}&count=1`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          'Accept-Version': 'v1',
        },
      }
    );

    if (!res.ok) {
      console.error(`Unsplash API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    const photo = Array.isArray(data) ? data[0] : data;

    if (!photo) return null;

    return {
      id: photo.id,
      url: `${photo.urls.regular}&w=800&q=80`,
      downloadUrl: photo.links.download_location,
      alt: photo.alt_description ?? 'Postcard image',
      photographerName: photo.user.name,
      photographerUrl: `${photo.user.links.html}?utm_source=wordcards&utm_medium=referral`,
      unsplashUrl: `${photo.links.html}?utm_source=wordcards&utm_medium=referral`,
    };
  } catch (err) {
    console.error('Unsplash fetch error:', err);
    return null;
  }
}

/**
 * Trigger Unsplash download endpoint — required by API guidelines
 * Call this when a photo is actually displayed to a user
 */
export async function triggerUnsplashDownload(
  downloadUrl: string,
  accessKey: string
): Promise<void> {
  try {
    await fetch(downloadUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        'Accept-Version': 'v1',
      },
    });
  } catch {
    // Non-critical — log but do not surface to user
    console.error('Unsplash download trigger failed');
  }
}
