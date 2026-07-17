import { faker } from '@faker-js/faker';
import { CandidateProfile } from '../../models/auth/candidate/CandidateProfile';

export function generateCandidateProfile(): CandidateProfile {
  return {
    desiredPosition: 'Qa',
    desiredRoles: ['PM'],
    coreTechnicalSkills: [
      'DevOps',
      'JavaScript',
      'API testing',
      'manual testing',
      'Mobile testing',
    ],
    salaryType: 'Annual',
    desiredBaseSalary: 2400,
    jobExperience: 'Less than 1 year',
    englishLevel: 'Elementary',
    yourLocation: 'Kharkiv',
    employmentOptions: ['remote'],
    achievements: faker.lorem.sentence(),
    workExpectations: faker.lorem.sentence(),
  };
}
