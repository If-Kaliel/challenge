export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T | undefined> {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const url = `${baseUrl}${path}`;

  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  headers.set('role', 'ADMIN');

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new ApiError(0, `Network error: ${msg}`);
  }

  if (!response.ok) {
    let errorText = response.statusText || `HTTP ${response.status}`;
    try {
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const body = await response.json();
        if (body && (body.message || body.error || body.detail)) {
          errorText = body.message ?? body.error ?? body.detail ?? JSON.stringify(body);
        } else {
          errorText = JSON.stringify(body);
        }
      } else {
        const text = await response.text();
        if (text) errorText = text;
      }
    } catch {
      // mantém statusText se o parsing falhar
    }
    throw new ApiError(response.status, `Erro ${response.status}: ${errorText}`);
  }

  if (response.status === 204) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return await response.json();
  }

  try {
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : undefined;
  } catch {
    return undefined;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};