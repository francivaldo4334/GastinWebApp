export const formatMoney = (value: string) => {
  const digits = value.replace(/\D/g, "").padStart(3, "0");
  const integer = digits.slice(0, -2);
  const cents = digits.slice(-2);
  const formattedInteger = parseInt(integer, 10).toLocaleString("pt-BR")
  return `${formattedInteger},${cents}`;
}
