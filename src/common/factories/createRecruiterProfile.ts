import { RecruiterProfile } from '../../models/auth/recruiter/RecruiterProfile';

export function createRecruiterProfile(
  overrides: Partial<RecruiterProfile> = {},
): RecruiterProfile {
  const role = 'HR';
  const companyName = 'Mate Academy';

  return {
    role,
    companyName,
    ...overrides,
  };
}
