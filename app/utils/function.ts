/* eslint-disable sonarjs/pseudo-random */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
// Based on forthcoming Safe Assignment Operator ?=
// https://github.com/arthurfiorette/proposal-safe-assignment-operator

type TryCatchSuccess<T> = [error: null | undefined, result: Awaited<T>];
type TryCatchError = [error: Error, result: null | undefined];
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
    return [undefined, result] as TryCatchSuccess<T>;
  }

  return [error, undefined] as TryCatchError;
};

class MockHTTPErrpr extends Error {}
class MockZodError extends Error {}

const handleHttpError = (error: MockHTTPErrpr) => {};

const handleZodError = (error: MockZodError) => {};

const handleError = (error: unknown) => {
  if (error instanceof MockHTTPErrpr) {
    return handleHttpError(error);
  }

  if (error instanceof MockZodError) {
    return handleZodError(error);
  }

  return error;
};
type TryResponseSuccess<T> = [error: null, result: T];
type TryResponseError = [error: Error, result: null];
type TryResponseResponse<T> = TryResponseError | TryResponseSuccess<T>;

export const tryResponse = async <T, A extends readonly unknown[]>(
  fn: (...args: A) => T,
  ...args: A
): Promise<TryResponseResponse<T>> => {
  const [error, result] = await tryCatch(fn, ...args);

  if (error) {
    return [handleError(error), null] as TryResponseError;
  }

  return [null, result] as TryResponseSuccess<T>;
};

(async () => {
  /* 
  Hover mouse over `result` to see type
  result: Promise<{
    'hello-world': boolean;
  }> | null
  */
  const [error, result] = await tryResponse(async () => {
    if (Math.random() > 0.5) {
      throw new Error('Random error');
    }

    return {'hello-world': true};
  });

  // Hover mouse over `error` to see type
  // error: Error | null
  if (error) {
    // Hover mouse over `error` to see type
    // error: Error
    return error;
  }

  // Because of typechecking,
  // we know `result` is not null
  // Hover mouse over `result` to see type
  // result: {
  //   'hello-world': boolean;
  // }
  console.log(result);
})();

export const noop = () => {};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
