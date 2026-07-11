import { RecruiterProfile } from '../../models/auth/recruiter/RecruiterProfile';

export function generateRecruiterProfile() {
  const position = 'HR';
  const companyName = 'Mate Academy';

  return new RecruiterProfile(position, companyName);
}
