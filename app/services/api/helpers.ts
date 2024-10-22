import {json} from '@remix-run/node';
import {HTTPError} from 'ky';
import {ZodError} from 'zod';
import {tryCatch} from '~/utils/function';

const isHTTPError = (error: unknown): error is HTTPError =>
  error instanceof HTTPError;

const handleHTTPError = (error: HTTPError) =>
  json(
    {error: true},
    {status: error.response.status, statusText: error.response.statusText}
  );

const isZodError = (error: unknown): error is ZodError =>
  error instanceof ZodError;

const handleZodError = (error: ZodError) =>
  json({error}, {status: 500, statusText: 'zodError'});

const handleResponseError = (error: unknown) => {
  if (isHTTPError(error)) {
    return handleHTTPError(error);
  }

  if (isZodError(error)) {
    return handleZodError(error);
  }

  // unexpected error
  if (error instanceof Error) {
    throw error;
  }
};

export const handleRequest = async <T>(fn: () => Promise<T>) => {
  const [error, result] = await tryCatch(fn);

  if (error) {
    return [handleResponseError(error), undefined];
  }

  return [undefined, result];
};
