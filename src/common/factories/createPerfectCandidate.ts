import { faker } from '@faker-js/faker';
import { PerfectCandidate } from '@models/auth/recruiter/PerfectCandidate';
import { PerfectCandidateRole } from '@models/auth/recruiter/PerfectCandidateRole';
import { PerfectCandidateTechnology } from '@models/auth/recruiter/PerfectCandidateTechnology';

export function createPerfectCandidate(
  overrides: Partial<PerfectCandidate> = {},
): PerfectCandidate {
  const candidateRoles: Array<PerfectCandidateRole> = ['QA'];
  const candidateTechnologies: Array<PerfectCandidateTechnology> = ['JavaScript'];
  const jobExperience = 'Less than 1 year';
  const englishLevel = 'Elementary +';
  const templateMessage = faker.lorem.sentence();

  return {
    candidateRoles,
    candidateTechnologies,
    jobExperience,
    englishLevel,
    templateMessage,
    ...overrides,
  };
}
