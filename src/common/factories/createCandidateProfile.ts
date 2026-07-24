import { faker } from '@faker-js/faker';
import { CandidateProfile } from '@models/auth/candidate/CandidateProfile';
import { EmploymentOption } from '@models/auth/candidate/EmploymentOption';
import { CoreTechnicalSkill } from '@models/auth/candidate/CoreTechnicalSkill';
import { Role } from '@models/auth/candidate/Role';

export function createCandidateProfile(
  overrides: Partial<CandidateProfile> = {},
): CandidateProfile {
  const desiredPosition = 'Qa';
  const desiredRoles: Array<Role> = ['PM'];
  const coreTechnicalSkills: Array<CoreTechnicalSkill> = [
    'DevOps',
    'JavaScript',
    'API testing',
    'manual testing',
    'Mobile testing',
  ];
  const salaryType = 'Annual';
  const desiredBaseSalary = 2400;
  const jobExperience = 'Less than 1 year';
  const englishLevel = 'Elementary';
  const yourLocation = 'Kharkiv';
  const employmentOptions: Array<EmploymentOption> = ['remote'];
  const achievements = faker.lorem.sentence();
  const workExpectations = faker.lorem.sentence();

  return {
    desiredPosition,
    desiredRoles,
    coreTechnicalSkills,
    salaryType,
    desiredBaseSalary,
    jobExperience,
    englishLevel,
    yourLocation,
    employmentOptions,
    achievements,
    workExpectations,
    ...overrides,
  };
}
