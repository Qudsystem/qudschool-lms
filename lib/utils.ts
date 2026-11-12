import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * يدمج أسماء كلاسات Tailwind بذكاء (يزيل التعارض بينها).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
