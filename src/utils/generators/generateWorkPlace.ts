import { WorkPlace } from '../../models/auth/candidate/WorkPlace';

export function generateWorkPlace(userId: number) {
  const candidateProfileId = userId;
  const title = 'Automation Qa';
  const companyName = 'Mate Academy';
  const description = 'Work description';
  const startDate = '2025-1';
  const endDate = '2026-1';

  return new WorkPlace(candidateProfileId, title, companyName, description, startDate, endDate);
}
