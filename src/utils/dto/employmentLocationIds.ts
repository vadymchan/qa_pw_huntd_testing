import { EmploymentOption } from '@models/auth/candidate/EmploymentOption';

const EMPLOYMENT_LOCATION_ID: Record<EmploymentOption, number> = {
  office: 1,
  remote: 2,
};

export const getEmploymentLocationIds = (employmentOptions: Array<EmploymentOption>) =>
  employmentOptions.map((employmentOption) => EMPLOYMENT_LOCATION_ID[employmentOption]);
