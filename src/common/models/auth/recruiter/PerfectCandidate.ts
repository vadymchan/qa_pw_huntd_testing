import { PerfectCandidateEnglishLevel } from './PerfectCandidateEnglishLevel';
import { PerfectCandidateJobExperience } from './PerfectCandidateJobExperience';
import { PerfectCandidateRole } from './PerfectCandidateRole';
import { PerfectCandidateTechnology } from './PerfectCandidateTechnology';

export type PerfectCandidate = {
  candidateRoles: Array<PerfectCandidateRole>;
  candidateTechnologies: Array<PerfectCandidateTechnology>;
  jobExperience: PerfectCandidateJobExperience;
  englishLevel: PerfectCandidateEnglishLevel;
  templateMessage: string;
};
