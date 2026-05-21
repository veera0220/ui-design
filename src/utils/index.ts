/**
 * cn — lightweight classname joiner (no clsx/tailwind dependency).
 * Filters out falsy values.
 *
 * @example
 * cn("btn", isActive && "btn--active", undefined) // "btn btn--active"
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * formatDate — locale-aware date formatter.
 * @example formatDate(new Date(), "en-US", { month: "short", day: "numeric" })
 */
export function formatDate(
  date: Date | string | number,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * truncate — truncates a string to maxLength and appends suffix.
 */
export function truncate(str: string, maxLength: number, suffix = "…"): string {
  return str.length <= maxLength ? str : str.slice(0, maxLength) + suffix;
}
