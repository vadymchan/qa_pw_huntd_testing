import { faker } from '@faker-js/faker';
import { PerfectCandidate } from '../../models/auth/recruiter/PerfectCandidate';

export function generatePerfectCandidate(): PerfectCandidate {
  return {
    candidateRoles: ['QA'],
    candidateTechnologies: ['JavaScript'],
    jobExperience: 'Less than 1 year',
    englishLevel: 'Elementary +',
    templateMessage: faker.lorem.sentence(),
  };
}
