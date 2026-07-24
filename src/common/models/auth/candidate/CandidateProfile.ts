import { CityName } from '@models/auth/candidate/CityName';
import { EnglishLevel } from '@models/auth/candidate/EnglishLevel';
import { JobExperience } from '@models/auth/candidate/JobExperience';
import { Role } from '@models/auth/candidate/Role';
import { CoreTechnicalSkill } from '@models/auth/candidate/CoreTechnicalSkill';
import { EmploymentOption } from '@models/auth/candidate/EmploymentOption';
import { CityDto, getCities } from '@utils/dto/cities';
import { getTechnologyIds } from '@utils/dto/technologyIds';
import { getSpecializationIds } from '@utils/dto/specializationIds';
import { getJobExperienceId } from '@utils/dto/jobExperienceIds';
import { getEnglishLevelId } from '@utils/dto/englishLevelId';
import { getEmploymentLocationIds } from '@utils/dto/employmentLocationIds';
import { SalaryType } from '@models/auth/candidate/SalaryType';

export type CandidateProfile = {
  desiredPosition: string;
  desiredRoles: Array<Role>;
  coreTechnicalSkills: Array<CoreTechnicalSkill>;
  salaryType: SalaryType;
  desiredBaseSalary: number;
  jobExperience: JobExperience;
  englishLevel: EnglishLevel;
  yourLocation: CityName;
  employmentOptions: Array<EmploymentOption>;
  achievements: string;
  workExpectations: string;
};

export type CandidateProfileDto = {
  position: string;
  technologiesIds: Array<number>;
  specializationsIds: Array<number>;
  salary: number;
  jobExperienceId: number;
  englishLevelId: number;
  cities: Array<CityDto>;
  employmentLocationsIds: Array<number>;
  achievements: string;
  workExpectations: string;
};

export function toCandidateProfileDto(candidateProfile: CandidateProfile): CandidateProfileDto {
  return {
    position: candidateProfile.desiredPosition,
    technologiesIds: getTechnologyIds(candidateProfile.coreTechnicalSkills),
    specializationsIds: getSpecializationIds(candidateProfile.desiredRoles),
    salary: candidateProfile.desiredBaseSalary,
    jobExperienceId: getJobExperienceId(candidateProfile.jobExperience),
    englishLevelId: getEnglishLevelId(candidateProfile.englishLevel),
    cities: getCities([candidateProfile.yourLocation]),
    employmentLocationsIds: getEmploymentLocationIds(candidateProfile.employmentOptions),
    achievements: candidateProfile.achievements,
    workExpectations: candidateProfile.workExpectations,
  };
}
