import { JobExperience } from '../../models/auth/candidate/JobExperience';

const JOB_EXPERIENCE_ID: Record<JobExperience, number> = {
  'Less than 1 year': 1,
  '1-3 years': 2,
  '3-5 years': 3,
  '5+ years': 4,
};

export const getJobExperienceId = (jobExperience: JobExperience) =>
  JOB_EXPERIENCE_ID[jobExperience];
