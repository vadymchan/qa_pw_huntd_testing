import { EnglishLevel } from '../../common/models/auth/candidate/EnglishLevel';

const ENGLISH_LEVEL_ID: Record<EnglishLevel, number> = {
  Elementary: 1,
  'Pre intermediate': 2,
  Intermediate: 3,
  'Upper intermediate': 4,
  Advanced: 5,
};

export const getEnglishLevelId = (englishLevel: EnglishLevel) => ENGLISH_LEVEL_ID[englishLevel];
