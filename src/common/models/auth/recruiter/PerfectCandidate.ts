import { PerfectCandidateEnglishLevel } from '@models/auth/recruiter/PerfectCandidateEnglishLevel';
import { PerfectCandidateJobExperience } from '@models/auth/recruiter/PerfectCandidateJobExperience';
import { PerfectCandidateRole } from '@models/auth/recruiter/PerfectCandidateRole';
import { PerfectCandidateTechnology } from '@models/auth/recruiter/PerfectCandidateTechnology';

export type PerfectCandidate = {
  candidateRoles: Array<PerfectCandidateRole>;
  candidateTechnologies: Array<PerfectCandidateTechnology>;
  jobExperience: PerfectCandidateJobExperience;
  englishLevel: PerfectCandidateEnglishLevel;
  templateMessage: string;
};
