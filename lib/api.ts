import { API_BASE_URL } from './constants';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function extractMessage(body: unknown, fallback: string): string {
  if (typeof body === 'string' && body.length > 0) {
    return body;
  }
  if (body && typeof body === 'object') {
    const candidate = (body as { message?: unknown }).message;
    if (typeof candidate === 'string' && candidate.length > 0) {
      return candidate;
    }
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate.map(String).join(', ');
    }
  }
  return fallback;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(0, `Network error contacting ${API_BASE_URL}`);
  }

  const text = await response.text();
  let body: unknown = null;
  if (text.length > 0) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractMessage(body, `Request failed (${response.status})`),
    );
  }

  return body as T;
}