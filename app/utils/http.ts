export const toHeadersObject = (headers?: Headers | Record<string, string>) =>
  headers ?
    headers instanceof Headers ?
      Object.fromEntries(headers)
    : headers
  : undefined;
