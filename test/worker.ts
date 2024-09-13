import {setupWorker} from 'msw/browser';
import handlers from './handlers';
import ping from './handlers/ping';

export const worker = setupWorker(ping, ...handlers);
