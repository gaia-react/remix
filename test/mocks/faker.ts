import {faker, fakerJA} from '@faker-js/faker';

// 7191 is the letter position of GAIA characters in the alphabet
// this is for consistent tests with faker data
const GAIA_SEED = 7191;
faker.seed(GAIA_SEED);
fakerJA.seed(GAIA_SEED);

export default {
  en: faker,
  ja: fakerJA,
} as Record<string, typeof faker>;
