// src/utils/fetchUtils.ts

export const fetchImageWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Image fetch failed");
    return await response.blob();
  } catch (error) {
    console.error("Image fetch error:", error);
    return null; // Fallback or null image
  } finally {
    clearTimeout(timeoutId);
  }
};
