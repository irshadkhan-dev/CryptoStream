import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLargeNumber(number: number): string {
  if (number >= 1_000_000_000_000) {
    return `$${(number / 1_000_000_000_000).toFixed(1)}T`;
  } else if (number >= 1_000_000_000) {
    return `$${(number / 1_000_000_000).toFixed(1)}B`;
  } else if (number >= 1_000_000) {
    return `$${(number / 1_000_000).toFixed(1)}M`;
  } else if (number >= 1_000) {
    return `$${(number / 1_000).toFixed(1)}K`;
  } else {
    return `$${number.toFixed(1)}`;
  }
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
