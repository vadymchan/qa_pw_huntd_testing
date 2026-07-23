import { CoreTechnicalSkill } from '../../common/models/auth/candidate/CoreTechnicalSkill';

const TECHNOLOGY_ID: Record<CoreTechnicalSkill, number> = {
  DevOps: 528,
  JavaScript: 5,
  'API testing': 90,
  'manual testing': 87,
  'Mobile testing': 89,
  Python: 46,
  GraphQL: 140,
  MySQL: 22,
  'Big Data': 535,
  'Data Science': 529,
};

export const getTechnologyIds = (coreTechnicalSkills: Array<CoreTechnicalSkill>) =>
  coreTechnicalSkills.map((coreTechnicalSkill) => TECHNOLOGY_ID[coreTechnicalSkill]);
