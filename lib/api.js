/**
 * Centralized API client for RedAuth.
 *
 * - Cookies are sent automatically (credentials: "include").
 * - On ACCESS_TOKEN_EXPIRED, silently rotates tokens and retries once.
 * - On REFRESH_TOKEN_EXPIRED after rotation, throws so callers can redirect to /login.
 * - Validation errors (details array) are preserved on the thrown error.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(message, type, details) {
    super(message);
    this.name = "ApiError";
    this.type = type || "APP_ERROR";
    this.details = details || [];
  }
}

async function rotateTokens() {
  const { getDeviceId } = await import("./device");
  const res = await fetch(`${BASE_URL}/auth/get-access-token`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device: getDeviceId() }),
  });
  try {
    return await res.json();
  } catch {
    return { success: false };
  }
}

/**
 * @param {string} path  - e.g. "/auth/login"
 * @param {RequestInit} options - standard fetch options (method, body, etc.)
 * @param {boolean} isRetry - internal flag; do not pass manually
 * @returns {Promise<object>} parsed success response body
 * @throws {ApiError}
 */
export async function apiFetch(path, options = {}, isRetry = false) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new ApiError("Server returned an unexpected response.", "APP_ERROR");
  }

  if (data.success) return data;

  // Access token expired — rotate once and retry
  if (data.type === "ACCESS_TOKEN_EXPIRED" && !isRetry) {
    const rotated = await rotateTokens();
    if (rotated.success) {
      return apiFetch(path, options, true);
    }
    // Refresh token also gone — force re-login
    throw new ApiError(
      "Your session has expired. Please log in again.",
      "REFRESH_TOKEN_EXPIRED"
    );
  }

  throw new ApiError(
    data.message || "Something went wrong.",
    data.type,
    data.details
  );
}

/**
 * Extracts field-level validation errors from an ApiError into an object map.
 * { email: "Invalid email", password: "Too short" }
 */
export function extractFieldErrors(error) {
  if (!error.details || !error.details.length) return {};
  return error.details.reduce((acc, d) => {
    if (d.field) acc[d.field] = d.message;
    return acc;
  }, {});
}
