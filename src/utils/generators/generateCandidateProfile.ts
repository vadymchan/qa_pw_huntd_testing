import { CandidateProfile } from '../../models/auth/candidate/CandidateProfile';

export function generateCandidateProfile() {
  const position = 'Qa';
  const technologiesIds = [528, 5, 90, 87, 89];
  const specializationsIds = [22];
  const salary = 2400;
  const jobExperienceId = 1;
  const englishLevelId = 1;
  const cities = [
    {
      cityId: 'ChIJiw-rY5-gJ0ERCr6kGmgYTC0',
      cityName: 'Kharkiv',
      cityCountrySlug: 'UA',
      cityCountryName: 'Ukraine',
      cityTimezone: 180,
      type: 'CANDIDATE_CITY',
    },
  ];
  const employmentLocationsIds = [2];
  const achievements = 'Achivements';
  const workExpectations = 'Work expectations';

  return new CandidateProfile(
    position,
    technologiesIds,
    specializationsIds,
    salary,
    jobExperienceId,
    englishLevelId,
    cities,
    employmentLocationsIds,
    achievements,
    workExpectations,
  );
}
