import { RecruiterProfile } from '../../models/auth/recruiter/RecruiterProfile';

export function generateRecruiterProfile(): RecruiterProfile {
  const role = 'HR';
  const companyName = 'Mate Academy';

  return {
    role,
    companyName,
  };
}
