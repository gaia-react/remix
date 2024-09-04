type TryCatchSuccess<T> = [result: Awaited<T>, error: undefined];
type TryCatchError = [result: undefined, error: Error];
type TryCatchResult<T> = TryCatchError | TryCatchSuccess<T>;

export const tryCatch = async <T, A extends readonly unknown[]>(
  fn: (...args: A) => T,
  ...args: A
): Promise<TryCatchResult<T>> => {
  let error;
  let result;

  try {
    // eslint-disable-next-line sonarjs/no-invalid-await
    result = await fn(...args);
  } catch (caughtError) {
    error = caughtError as Error;
  }

  if (result) {
    return [result, undefined] as TryCatchSuccess<T>;
  }

  return [undefined, error] as TryCatchError;
};

export const noop = () => {};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
