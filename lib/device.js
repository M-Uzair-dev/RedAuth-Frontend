/**
 * Returns a stable UUID v4 for this browser/device.
 * Generated once and persisted in localStorage.
 * Required by the API for per-device session management.
 */
export function getDeviceId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("redauth_device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("redauth_device_id", id);
  }
  return id;
}
