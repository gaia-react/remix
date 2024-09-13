export const toInitialCap = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
