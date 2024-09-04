import en from './en';
import ja from './ja';

export const LANGUAGES = ['en', 'ja'];

export type Language = 'en' | 'ja';

export default {en, ja} as const;
