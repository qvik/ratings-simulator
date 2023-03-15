export function getIntegerInputValue(inputValue: string) {
  const newValue = parseInt(inputValue?.replace(/\D/, '') || '');
  return isNaN(newValue) ? 0 : newValue;
}
