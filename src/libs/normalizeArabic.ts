export const normalizeArabic = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u0652]/g, "") // Remove Tashkeel
    .replace(/[أإآ]/g, "ا") // Normalize Alif
    .replace(/ة/g, "ه") // Normalize Ta Marbuta
    .replace(/ى/g, "ي") // Normalize Ya
    .toLowerCase()
    .trim();
};
