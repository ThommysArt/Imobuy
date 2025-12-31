/**
 * Comprehensive list of currencies with their codes and names
 */
export const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/." },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

/**
 * Get currency information by code
 */
export function getCurrency(code?: string | null) {
  if (!code) {
    // Default to FCFA (XAF)
    return CURRENCIES.find((c) => c.code === "XAF") || CURRENCIES[0];
  }
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES.find((c) => c.code === "XAF") || CURRENCIES[0];
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currencyCode - The currency code (defaults to USD)
 * @param options - Intl.NumberFormat options
 */
export function formatCurrency(
  amount: number | null | undefined,
  currencyCode?: string | null,
  options?: Intl.NumberFormatOptions,
): string {
  if (amount === null || amount === undefined) return "-";

  const currency = getCurrency(currencyCode);

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  } catch (_error) {
    // Fallback to simple formatting if Intl fails
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Format currency with symbol only (no locale formatting)
 */
export function formatCurrencySimple(
  amount: number | null | undefined,
  currencyCode?: string | null,
): string {
  if (amount === null || amount === undefined) return "-";

  const currency = getCurrency(currencyCode);
  return `${currency.symbol} ${amount.toFixed(2)}`;
}
