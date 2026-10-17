export const MAX_FILE_BYTES = 15 * 1024 * 1024;
export const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

/** Returns a message for a file the editor cannot use, or null when it is fine. */
export function validatePhoto(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return "Please choose a JPG, PNG or WebP image.";
  if (file.size > MAX_FILE_BYTES) return "That file is larger than 15 MB. Please choose a smaller one.";
  return null;
}

export function formatFileSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
