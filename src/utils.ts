export function extend(
  target: { [key: string]: any },
  source: { [key: string]: any }
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  Object.keys(target).forEach((k) => {
    result[k] = target[k];
  });
  Object.keys(source).forEach((k) => {
    result[k] = source[k];
  });
  return result;
}

export function isString(v: any): boolean {
  return typeof v === 'string';
}
