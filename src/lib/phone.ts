// Белорусские мобильные номера: +375 и код оператора A1 (29, 44), МТС (29, 33), life:) (25).
export const BY_PHONE = /^\+375(25|29|33|44)\d{7}$/;

/** «8 029 123-45-67», «29 1234567», «+375 (29) 123 45 67» → «+375291234567». */
export function normalizeByPhone(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("80") && d.length === 11) d = "375" + d.slice(2);
  if (d.length === 9) d = "375" + d;
  return "+" + d;
}
